﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Car_Rental_System.Data;
using Car_Rental_System.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Car_Rental_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {

        private readonly CarsAPIDbContext dbContext;

        //create object for GetUserId
        private GetUserId getUserId;

        // Creating a constructor and injecting the dbcontext
        public StaffController(CarsAPIDbContext dbContext, GetUserId getUserId)
        {
            this.dbContext = dbContext;
            this.getUserId = getUserId;
        }

        [HttpPost]
        public async Task<IActionResult> AddStaff(RegisterStaff registerStaff)
        {
            var existingStaff = await dbContext.Staff.FirstOrDefaultAsync(s => s.Staff_Email == registerStaff.Staff_Email);
            if (existingStaff != null)
            {
                return BadRequest("Email already exists in the database.");
            }
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerStaff.Staff_Password);
            var newStaff = new Staff()
            {
                Staff_Id = Guid.NewGuid(),
                Staff_Name = registerStaff.Staff_Name,
                Staff_Email = registerStaff.Staff_Email,
                Staff_Password = hashedPassword
            };
            await dbContext.Staff.AddAsync(newStaff);
            await dbContext.SaveChangesAsync();
            return Ok(newStaff);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Login loginStaff)
        {
            var staff = await dbContext.Staff.FirstOrDefaultAsync(s => s.Staff_Email == loginStaff.Email);
            if (staff == null)
            {
                return BadRequest("Staff not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(loginStaff.Password, staff.Staff_Password))
            {
                return BadRequest("Invalid Credentials");
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("AShfhajfsgahbfjhbashj.asd@shajfhjas"); 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, staff.Staff_Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature) 
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var loginReply = new LoginReply
            {
                Token = tokenString,
                Email = staff.Staff_Email,
                Name = staff.Staff_Name
            };

            //return Ok(new { tokenString });
            return Ok(loginReply);
        }
        //Getting the list of staff details
        [HttpGet]
        public async Task<IActionResult> GetStaff()
        {
            // returing the list of staff in 200 response
            return Ok(await dbContext.Staff.ToListAsync());
        }



        //IMPORTANT: TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //change password
        [HttpPut("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePassword changePassword)
        {
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(tokenString))
            {
                return BadRequest("Token is empty.");
            }
            var staffId = getUserId.GetUserIdFromToken(tokenString);
            var staff = await dbContext.Staff.FindAsync(Guid.Parse(staffId));
            if (staff == null)
            {
                return NotFound("Staff not found.");
            }

            if (!BCrypt.Net.BCrypt.Verify(changePassword.OldPassword, staff.Staff_Password))
            {
                return BadRequest("Invalid password.");
            }
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(changePassword.NewPassword);
            staff.Staff_Password = hashedPassword;
            await dbContext.SaveChangesAsync();
            return Ok("Password changed successfully.");
        }
    }
}
