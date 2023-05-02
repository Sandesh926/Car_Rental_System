using Car_Rental_System.Data;
using Car_Rental_System.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Car_Rental_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly CarsAPIDbContext dbContext;

        //create object for GetUserId
        private GetUserId getUserId;

        // Creating a constructor and injecting the dbcontext
        public AdminController(CarsAPIDbContext dbContext, GetUserId getUserId)
        {
            this.dbContext = dbContext;
            this.getUserId = getUserId;
        }

        [HttpPost]
        public async Task<IActionResult> AddAdmin(Admin admin){
            var existingAdmin = await dbContext.Admin.FirstOrDefaultAsync(a => a.Admin_email == admin.Admin_email);
            if (existingAdmin != null)
            {
                return BadRequest("Email already exists in the database.");
            }
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(admin.Admin_password);
            var newAdmin = new Admin()
            {
                Admin_id = Guid.NewGuid(),
                Admin_name = admin.Admin_name,
                Admin_email = admin.Admin_email,
                Admin_password = hashedPassword
            };
            await dbContext.Admin.AddAsync(newAdmin);
            await dbContext.SaveChangesAsync();
            return Ok(newAdmin);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Login loginAdmin)
        {
            var admin = await dbContext.Admin.FirstOrDefaultAsync(a => a.Admin_email == loginAdmin.Email);
            if (admin == null)
            {
                return BadRequest("Admin not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(loginAdmin.Password, admin.Admin_password))
            {
                return BadRequest("Invalid Credentials");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("AShfhajfsgahbfjhbashj.asd@shajfhjas");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, admin.Admin_id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var loginReply = new LoginReply
            {
                Token = tokenString,
                Email = admin.Admin_email,
                Name = admin.Admin_name
            };
            //return Ok(admin);
            return Ok(loginReply);
        }

        //get all admin
        [HttpGet]
        public async Task<IActionResult> GetAllAdmin()
        {
            var admin = await dbContext.Admin.ToListAsync();
            return Ok(admin);
        }


    }
}
