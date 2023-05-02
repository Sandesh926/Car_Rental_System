using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Car_Rental_System
{
    public class GetUserId
    {

        public string GetUserIdFromToken(string tokenString)
        {
            // Verify and decode the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("AShfhajfsgahbfjhbashj.asd@shajfhjas");
            SecurityToken validatedToken;
            var claims = tokenHandler.ValidateToken(tokenString, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            }, out validatedToken);
    
            // Get the user id from the token's payload
            var userId = claims.FindFirst(ClaimTypes.Name)?.Value;
            return userId;
        }

    }
}