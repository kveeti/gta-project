using System.Security.Claims;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Api.Attributes;

public class Authorization
{
  public class CustomAuth : TypeFilterAttribute
  {
    public CustomAuth(string claimType, string claimValue) : base(typeof(ClaimRequirementFilter))
    {
      Arguments = new object[] {new Claim(claimType, claimValue) };
    }
  }

  public class ClaimRequirementFilter : IAsyncAuthorizationFilter
  {
    readonly Claim _claim;
    private readonly IGenericRepo<User> _userRepo;

    public ClaimRequirementFilter(IGenericRepo<User> aUserRepo, Claim claim)
    {
      _claim = claim;
      _userRepo = aUserRepo;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
      var isJwtAuthorized = context.HttpContext.User.Claims.Any(c => c.Type == _claim.Type && c.Value == _claim.Value);
      if (!isJwtAuthorized) context.Result = new ForbidResult();

      var jwtClaims = context.HttpContext.User.Claims;

      var userIdClaim = jwtClaims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
      var roleClaim = jwtClaims.FirstOrDefault(c => c.Type == ClaimTypes.Role);
      var usernameClaim = jwtClaims.FirstOrDefault(c => c.Type == ClaimTypes.Name);

      if (userIdClaim == null || roleClaim == null || usernameClaim == null)
      {
        context.Result = new ForbidResult();
        return;
      }

      var validGuid = Guid.TryParse(userIdClaim.Value, out var userId);
      if (!validGuid)
      {
        context.Result = new ForbidResult();
        return;
      }

      var user = await _userRepo.GetOneNotJoinedByFilter(user => user.Id == userId);

      if (user == null || user.Role != roleClaim.Value || user.Username != usernameClaim.Value)
      {
        context.Result = new ForbidResult();
        return;
      }
    }
  }
}