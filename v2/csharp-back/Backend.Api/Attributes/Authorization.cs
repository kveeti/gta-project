using System.Security.Claims;
using Backend.Api.Configs;
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
    private readonly IOptions<CookieConfig> _cookieConfig;
    private readonly IGenericRepo<User> _userRepo;

    public ClaimRequirementFilter(
      IJwt jwt,
      Claim claim,
      IGenericRepo<User> aUserRepo,
      IOptions<CookieConfig> aCookieConfig
    )
    {
      _jwt = jwt;
      _claim = claim;
      _userRepo = aUserRepo;
      _cookieConfig = aCookieConfig;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
      // firstly look for a refresh token 
      var refreshTokenFromCookie = context.HttpContext.Request.Cookies[_cookieConfig.Value.RefreshTokenCookieName];
      var refreshToken = _jwt.ValidateRefreshToken(refreshTokenFromCookie);

      // no (valid) refresh token, no access at all
      if (refreshTokenFromCookie == null || refreshToken == null)
      {
        HandleUnauthorized(context, "bad refresh token");
        return;
      }

      // refresh token was valid, try find a corresponding user 
      var dbUser = await _userRepo.GetOneByFilter(user => user.Id == refreshToken.UserId);
      if (dbUser == null)
      {
        HandleUnauthorized(context, ":D");
        return;
      }

      // check if refresh token's props match with the found user's props 
      var refreshMatches = TokenMatchesWithDb(refreshToken, dbUser);
      if (!refreshMatches)
      {
        HandleUnauthorized(context, ":Dd");
        return;
      }

      ValidTokenDto accessToken = null;

      // if access token was provided, check it
      try
      {
        var accessTokenFromHeader = context.HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
        if (accessTokenFromHeader.StartsWith("ey"))
        {
          accessToken = _jwt.ValidateAccessToken(accessTokenFromHeader);

          if (accessToken == null)
          {
            HandleUnauthorized(context, ":Ddd");
            return;
          }
        }
      }
      catch // just catching the string splitting...
      {
      }

      // automatically generate new tokens if refresh token was valid
      // but access token wasn't provided or had expired
      if (accessToken == null ||
          (DateTimeOffset.Now.ToUnixTimeSeconds() + 900) < accessToken.Exp)
      {
        var newAccessToken = _jwt.CreateAccessToken(dbUser);
        accessToken = _jwt.ValidateAccessToken(newAccessToken);
        context.HttpContext.Request.Headers.Authorization = $"Bearer {newAccessToken}";

        var newRefreshToken = _jwt.CreateRefreshToken(dbUser);
        context.HttpContext
          .Response.Headers
          .SetCookie = Cookie.CreateCookie(_cookieConfig.Value.RefreshTokenCookieName, newRefreshToken);

        context.HttpContext.Response.Headers[_cookieConfig.Value.AccessTokenHeaderName] = newAccessToken;
      }

      context.HttpContext.Items["userId"] = dbUser.Id;

      var hasCorrectRole = _claim.Value.Contains(accessToken.Role);
      if (!hasCorrectRole)
      {
        context.Result = new ForbidResult();
      }
    }

    private static bool TokenMatchesWithDb(ValidTokenDto aToken, User aDbData)
    {
      if (aDbData.TokenVersion != aToken.TokenVersion) return false;
      if (aDbData.Role != aToken.Role) return false;
      if (aDbData.Username != aToken.Username) return false;
      if (aDbData.Email != aToken.Email) return false;

      return true;
    }

    private void HandleUnauthorized(AuthorizationFilterContext context, string message)
    {
      context.HttpContext.Response.Cookies.Delete(_cookieConfig.Value.RefreshTokenCookieName);
      Console.WriteLine($"unauthorized {message}");
      context.Result = new UnauthorizedObjectResult(message);
    }
  }
}