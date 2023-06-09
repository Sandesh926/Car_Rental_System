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
    public class DamageCarController : ControllerBase
    {



        private readonly CarsAPIDbContext dbContext;

        //create object for GetUserId
        private GetUserId getUserId;

        // Creating a constructor and injecting the dbcontext
        public DamageCarController(CarsAPIDbContext dbContext, GetUserId getUserId)
        {
            this.dbContext = dbContext;
            this.getUserId = getUserId;
        }

        //post damage car to database

        //IMPORTANT: TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        [HttpPost]
        public async Task<IActionResult> AddDamageCar(DamageRequest damageCar)
        {
            // Extract token from the request header
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
    
            try
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
        
                var car = await dbContext.Cars.FirstOrDefaultAsync(c => c.Car_id.ToString() == damageCar.car_id.ToString());
                if (car == null)
                {
                    return BadRequest("Car does not exist in the database.");
                }
                var damageCarObj = new DamageCar()
                {
                    Damage_id = Guid.NewGuid(),
                    Car_id = Guid.Parse(damageCar.car_id),
                    DamageDate = damageCar.DamageDate,
                    Customer_Id = Guid.Parse(userId) // Assign the user id to the damage car object
                };
                await dbContext.DamageCar.AddAsync(damageCarObj);
                await dbContext.SaveChangesAsync();
                return Ok(damageCarObj);



            }
            catch (SecurityTokenException)
            {
                // Return a 401 Unauthorized response with an error message
                return Unauthorized("Invalid or expired token.");
            }
        }


        //add fine to damage car 
        [HttpPut("fine")]
        public async Task<IActionResult> AddFine(DamageCarFine fineCar)
        {
            

            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
    
            try
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
        
                var damageCar = await dbContext.DamageCar.FirstOrDefaultAsync(c => c.Damage_id.ToString() == fineCar.Damage_Id.ToString());
                if (damageCar == null)
                {
                    return BadRequest("Damage Car does not exist in the database.");
                }
                
                damageCar.DamageCharge = fineCar.Fine_Amount;
                damageCar.Staff_Id = Guid.Parse(userId);
                damageCar.Charge_status = "Pending";
                await dbContext.SaveChangesAsync();

                return Ok(damageCar);


            }
            catch (SecurityTokenException)
            {
                // Return a 401 Unauthorized response with an error message
                return Unauthorized("Invalid or expired token.");
            }
 

        }


        //get all damage cars customer
        //Cusotmer sees their own car damages
        [HttpGet("getDamageCarsByCustomer")]
        public async Task<IActionResult> GetDamageCarsByCustomer()
        {
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var id = getUserId.GetUserIdFromToken(tokenString);
            var damageCars = await dbContext.DamageCar
                .Where(d => d.Customer_Id.ToString() == id)
                .Select(d => new
                {
                    d.Damage_id,
                    d.DamageDate,
                    d.Car_id,
                    CarName = d.Cars.Car_Name,
                    d.Customer_Id,
                    CustomerName = $"{d.Customers.Customer_firstName} {d.Customers.Customer_lastName}",
                    d.Staff_Id,
                    StaffName = d.Staff.Staff_Name,
                    d.DamageCharge,
                    d.Charge_status
                })
                .ToListAsync();
            

            return Ok(damageCars);
        }



        //get all damage cars
        [HttpGet("getDamageCars")]
        public async Task<IActionResult> GetDamageCars()
        {
            var damageCars = await dbContext.DamageCar
                .Select(d => new
                {
                    d.Damage_id,
                    d.DamageDate,
                    d.Car_id,
                    CarName = d.Cars.Car_Name,
                    d.Customer_Id,
                    CustomerName = $"{d.Customers.Customer_firstName} {d.Customers.Customer_lastName}",
                    d.Staff_Id,
                    StaffName = d.Staff.Staff_Name,
                    d.DamageCharge,
                    d.Charge_status
                })
                .ToListAsync();

            //if (damageCars == null || !damageCars.Any())
            //{
            //    return BadRequest("No damage cars found.");
            //}

            
            return Ok(damageCars);
        }





    }
}
