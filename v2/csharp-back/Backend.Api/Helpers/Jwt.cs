﻿using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Api.Configs;
using Backend.Api.Models;
using Backend.Api.TokenDtos;
using Microsoft.Extensions.Options;

namespace Backend.Api.Helpers;

public class Jwt : IJwt
{
  private readonly IOptions<JwtConfig> _jwtConfig;

  public Jwt(IOptions<JwtConfig> aJwtConfig)
  {
    _jwtConfig = aJwtConfig;
  }

  public ValidTokenDto ValidateRefreshToken(string aToken)
  {
    if (aToken == null) return null;

    var handler = new JwtSecurityTokenHandler();
    var validationParams = new TokenValidationParameters()
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateIssuerSigningKey = true,
      ValidateLifetime = true,

      ValidIssuer = _jwtConfig.Value.Refresh_Iss,
      ValidAudience = _jwtConfig.Value.Refresh_Aud,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.Value.Refresh_Secret)),

      RequireAudience = true,
      RequireSignedTokens = true,
      RequireExpirationTime = true,
    };

    handler.ValidateToken(aToken, validationParams, out var validated);
    return ValidateExistenceOfClaimsRefreshToken(validated as JwtSecurityToken);
  }

  public ValidTokenDto ValidateAccessToken(string aToken)
  {
    if (aToken == null) return null;

    var handler = new JwtSecurityTokenHandler();
    var validationParams = new TokenValidationParameters()
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateIssuerSigningKey = true,

      ValidIssuer = _jwtConfig.Value.Access_Iss,
      ValidAudience = _jwtConfig.Value.Access_Aud,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.Value.Access_Secret)),

      RequireAudience = true,
      RequireSignedTokens = true,

      RequireExpirationTime = false,
      ValidateLifetime = false
    };


    try
    {
      handler.ValidateToken(aToken, validationParams, out var validated);
      return ValidateExistenceOfClaimsAccessToken(validated as JwtSecurityToken);
    }
    catch
    {
      return null;
    }
  }

  public string CreateRefreshToken(User user)
  {
    var claims = new[]
    {
      new Claim("userId", user.Id.ToString()),
      new Claim("role", user.Role),
      new Claim("username", user.Username),
      new Claim("email", user.Email),
      new Claim("tokenVersion", user.TokenVersion.ToString()),
      new Claim("emailVerified", (user.EmailVerifyToken == null).ToString()),
    };

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.Value.Refresh_Secret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(
      _jwtConfig.Value.Refresh_Iss,
      _jwtConfig.Value.Refresh_Aud,
      claims,
      expires: DateTime.Now.AddDays(7),
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  public string CreateAccessToken(User user)
  {
    var claims = new[]
    {
      new Claim("userId", user.Id.ToString()),
      new Claim("role", user.Role),
      new Claim("username", user.Username),
      new Claim("email", user.Email),
      new Claim("tokenVersion", user.TokenVersion.ToString()),
      new Claim("emailVerified", (user.EmailVerifyToken == null).ToString()),
      new Claim("exp", DateTimeOffset.Now.AddMinutes(15).ToUnixTimeSeconds().ToString())
    };

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.Value.Access_Secret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(
      _jwtConfig.Value.Access_Iss,
      _jwtConfig.Value.Access_Aud,
      claims,
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  private ValidTokenDto ValidateExistenceOfClaimsAccessToken(JwtSecurityToken token)
  {
    var expirationClaim = token.Claims.FirstOrDefault(claim => claim.Type == "exp");
    var tokenVersionClaim = token.Claims.FirstOrDefault(claim => claim.Type == "tokenVersion");
    var userIdClaim = token.Claims.FirstOrDefault(claim => claim.Type == "userId");
    var roleClaim = token.Claims.FirstOrDefault(claim => claim.Type == "role");
    var usernameClaim = token.Claims.FirstOrDefault(claim => claim.Type == "username");
    var emailClaim = token.Claims.FirstOrDefault(claim => claim.Type == "email");
    var emailVerifiedClaim = token.Claims.FirstOrDefault(claim => claim.Type == "emailVerified");

    if (expirationClaim == null)
      throw new Exception("token is missing its expiration");

    if (userIdClaim == null)
      throw new Exception("token is missing its user id");

    if (roleClaim == null)
      throw new Exception("token is missing its role");

    if (usernameClaim == null)
      throw new Exception("token is missing its username");

    if (tokenVersionClaim == null)
      throw new Exception("token is missing its version");

    if (emailClaim == null)
      throw new Exception("token is missing its email");
    
    if (emailVerifiedClaim == null)
      throw new Exception("token is missing its emailVerified");

    return new()
    {
      Exp = long.Parse(expirationClaim.Value),
      Role = roleClaim.Value,
      UserId = Guid.Parse(userIdClaim.Value),
      Username = usernameClaim.Value,
      Email = emailClaim.Value,
      TokenVersion = Guid.Parse(tokenVersionClaim.Value),
      EmailVerified = emailVerifiedClaim.Value == "true"
    };
  }

  private ValidTokenDto ValidateExistenceOfClaimsRefreshToken(JwtSecurityToken token)
  {
    var tokenVersionClaim = token.Claims.FirstOrDefault(claim => claim.Type == "tokenVersion");
    var userIdClaim = token.Claims.FirstOrDefault(claim => claim.Type == "userId");
    var roleClaim = token.Claims.FirstOrDefault(claim => claim.Type == "role");
    var usernameClaim = token.Claims.FirstOrDefault(claim => claim.Type == "username");
    var emailClaim = token.Claims.FirstOrDefault(claim => claim.Type == "email");
    var emailVerifiedClaim = token.Claims.FirstOrDefault(claim => claim.Type == "emailVerified");

    if (userIdClaim == null)
      throw new Exception("token is missing its user id");

    if (roleClaim == null)
      throw new Exception("token is missing its role");

    if (usernameClaim == null)
      throw new Exception("token is missing its username");

    if (tokenVersionClaim == null)
      throw new Exception("token is missing its version");

    if (emailClaim == null)
      throw new Exception("token is missing its email");
    
    if (emailVerifiedClaim == null)
      throw new Exception("token is missing its emailVerified");

    return new()
    {
      Role = roleClaim.Value,
      UserId = Guid.Parse(userIdClaim.Value),
      Username = usernameClaim.Value,
      Email = emailClaim.Value,
      TokenVersion = Guid.Parse(tokenVersionClaim.Value),
      EmailVerified = emailVerifiedClaim.Value == "true"
    };
  }
}