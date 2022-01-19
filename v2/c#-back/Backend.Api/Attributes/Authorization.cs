using System.Security.Claims;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Backend.Api.TokenDtos;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;

namespace Backend.Api.Attributes;

public class Authorization
{
  public class CustomAuth : TypeFilterAttribute
  {
    public CustomAuth([CanBeNull] string claimValue) : base(typeof(ClaimRequirementFilter))
    {
      Arguments = new object[] {new Claim(ClaimTypes.Role, claimValue)};
    }
  }

  public class ClaimRequirementFilter : IAsyncAuthorizationFilter
  {
    private readonly Claim _claim;
    private readonly IJwt _jwt;
    private readonly IOptions<Settings> _settings;
    private readonly IGenericRepo<User> _userRepo;

    public ClaimRequirementFilter(
      IJwt jwt,
      Claim claim,
      IGenericRepo<User> aUserRepo,
      IOptions<Settings> aSettings
    )
    {
      _jwt = jwt;
      _claim = claim;
      _userRepo = aUserRepo;
      _settings = aSettings;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
      string accessTokenFromHeader;
      string refreshTokenFromCookie;
      
      try
      {
        accessTokenFromHeader = context.HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        refreshTokenFromCookie = context.HttpContext.Request.Cookies[_settings.Value.RefreshTokenCookieName];
      }
      catch
      {
        context.HttpContext.Response.Cookies.Delete(_settings.Value.RefreshTokenCookieName);
        context.Result = new UnauthorizedObjectResult("bad auth");
        return;
      }
      

      var refreshToken = _jwt.ValidateRefreshToken(refreshTokenFromCookie);
      if (refreshTokenFromCookie == null || refreshToken == null)
      {
        //context.HttpContext.Response.Cookies.Delete(_settings.Value.RefreshTokenCookieName);
        context.Result = new UnauthorizedObjectResult("bad refresh token");
        return;
      }

      ValidTokenDto accessToken;

      try
      {
        accessToken = _jwt.ValidateAccessToken(accessTokenFromHeader);
      }
      catch (Exception e)
      {
        Console.Write(e);
        //context.HttpContext.Response.Cookies.Delete(_settings.Value.RefreshTokenCookieName);
        context.Result = new UnauthorizedObjectResult("bad access");
        return;
      }

      try
      {
        var dbUser = await _userRepo.GetOneByFilter(user => user.Id == refreshToken.UserId);

        if (dbUser.TokenVersion != refreshToken.TokenVersion)
        {
          context.HttpContext.Response.Cookies.Delete(_settings.Value.RefreshTokenCookieName);
          context.Result = new UnauthorizedObjectResult("revoked");
          return;
        }

        if (dbUser.Role != refreshToken.Role ||
            dbUser.Username != refreshToken.Username)
        {
          context.Result = new ForbidResult("data not matching");
          return;
        }

        // generate new tokens if refresh token was valid but 
        // there was no access token or it had expired
        if (accessToken == null || (DateTimeOffset.Now.ToUnixTimeSeconds() + 900) < accessToken.Exp)
        {
          Console.Write("yey");
          
          var newAccessToken = _jwt.CreateAccessToken(dbUser);
          accessToken = _jwt.ValidateAccessToken(newAccessToken);
          context.HttpContext.Request.Headers.Authorization = $"Bearer {newAccessToken}";
          
          var newRefreshToken = _jwt.CreateRefreshToken(dbUser);
          context.HttpContext
            .Response.Headers
            .SetCookie = Cookie.CreateCookie(_settings.Value.RefreshTokenCookieName, newRefreshToken);

          context.HttpContext.Response.Headers[_settings.Value.AccessTokenHeaderName] = newAccessToken;
        }
      }
      catch (Exception e)
      {
        Console.Write(e);
        context.HttpContext.Response.Cookies.Delete(_settings.Value.RefreshTokenCookieName);
        context.Result = new UnauthorizedResult();
        return;
      }

      var hasCorrectRole = _claim.Value.Contains(accessToken.Role);
      if (!hasCorrectRole)
      {
        context.Result = new ForbidResult();
        return;
      }
    }
  }
}