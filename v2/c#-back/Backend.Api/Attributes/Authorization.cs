using System.Security.Claims;
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

  public class ClaimRequirementFilter : IAuthorizationFilter
  {
    readonly Claim _claim;

    public ClaimRequirementFilter(Claim claim)
    {
      _claim = claim;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
      var isJwtAuthorized = context.HttpContext.User.Claims.Any(c => c.Type == _claim.Type && c.Value == _claim.Value);
      if (!isJwtAuthorized) context.Result = new ForbidResult();
      
      var repo = context.HttpContext.RequestServices.GetService(typeof(IUserRepo)) as IUserRepo;

      var jwtClaims = context.HttpContext.User.Claims;

      var username = jwtClaims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
      var role = jwtClaims.FirstOrDefault(c => c.Type == ClaimTypes.Role);

      if (username == null || role == null)
      {
        context.Result = new ForbidResult();
        return;
      }

      var user = repo.GetByUsername(username.Value);

      if (user == null || user.Role != role.Value) context.Result = new ForbidResult();
    }
  }
}