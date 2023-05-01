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
    public class CarRentController : ControllerBase
    {

        private readonly CarsAPIDbContext dbContext;

        public CarRentController(CarsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        //Add Car Rent to database 
        [HttpPost]
        public async Task<IActionResult> AddCarRent(RentCarRequest carRent)
        {
            var car = await dbContext.Cars.FirstOrDefaultAsync(c => c.Car_id.ToString() == carRent.Car_id);
            if (car == null)
            {
                return BadRequest("Car does not exist in the database.");
            }

            
            var customer = await dbContext.Customers.FirstOrDefaultAsync(c => c.Customer_Id.ToString() == carRent.Customer_id);
            var staff = await dbContext.Staff.FirstOrDefaultAsync(c => c.Staff_Id.ToString() == carRent.Staff_id);
            if (customer == null && staff == null)
            {
                return BadRequest("User does not exist in the database.");
            }
            var carRentObj = new RentCar()
            {
                Rent_id = Guid.NewGuid(),
                Rent_date_From = carRent.Rent_date_From,
                Rent_date_To = carRent.Rent_date_To,
                Car_id = carRent.Car_id,
                Staff_id = carRent.Staff_id,
                Customer_id = carRent.Customer_id,
                Rent_Status = carRent.Rent_Status
            };
            await dbContext.RentCar.AddAsync(carRentObj);
            await dbContext.SaveChangesAsync();
            return Ok(carRentObj);
        }

        //Get all car rents from database
        [HttpGet]
        public async Task<IActionResult> GetAllCarRents()
        {
            var carRents = await dbContext.RentCar.ToListAsync();
            return Ok(carRents);
        }

        //Get car rent by id from database
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarRentById(string id)
        {
            var carRent = await dbContext.RentCar.FirstOrDefaultAsync(c => c.Rent_id.ToString() == id);
            if (carRent == null)
            {
                return NotFound();
            }
            return Ok(carRent);
        }

        //Add staff name and change rent status to rented
        //IMPORTANT: TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        [HttpPut("/accept")]
        public async Task<IActionResult> AcceptCarRent(string car_id)
        {
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var staff_id = GetUserIdFromToken(tokenString);

            var carRentObj = await dbContext.RentCar.FirstOrDefaultAsync(c => c.Rent_id.ToString() == car_id);
            if (carRentObj == null)
            {
                return NotFound();
            }
            var staff = await dbContext.Staff.FirstOrDefaultAsync(c => c.Staff_Id.ToString() == staff_id);
            if (staff == null)
            {
                return BadRequest("Staff does not exist in the database.");
            }
            carRentObj.ApprovedBy = staff_id;
            carRentObj.Rent_Status = "Accepted";
            await dbContext.SaveChangesAsync();
            return Ok(carRentObj);
        }

        //Change rent status to rejected
        //IMPORTANT: TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        [HttpPut("/reject")]
        public async Task<IActionResult> RejectCarRent(string car_id)
        {
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var staff_id = GetUserIdFromToken(tokenString);
            var carRentObj = await dbContext.RentCar.FirstOrDefaultAsync(c => c.Rent_id.ToString() == car_id);
            if (carRentObj == null)
            {
                return NotFound();
            }
            var staff = await dbContext.Staff.FirstOrDefaultAsync(c => c.Staff_Id.ToString() == staff_id);
            if (staff == null)
            {
                return BadRequest("Staff does not exist in the database.");
            }
            carRentObj.ApprovedBy = staff_id;
            carRentObj.Rent_Status = "Rejected";
            await dbContext.SaveChangesAsync();
            return Ok(carRentObj);
        }


        //get user id from token
        private string GetUserIdFromToken(string tokenString)
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
