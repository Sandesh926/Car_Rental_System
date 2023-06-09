﻿using Car_Rental_System.Data;
using Car_Rental_System.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace Car_Rental_System.Controllers
{
    // annotating the controller and telling this is an api controller not mvc controller
    [ApiController]
    // Route the controller and we are writing the name controller because it gives the controller name which is cars
    [Route("api/[controller]")]
    public class CarsController : Controller
    {
        // this is used to talk to in-memory database
        private readonly CarsAPIDbContext dbContext;

        //create object for GetUserId
        private GetUserId getUserId;

        // Creating a constructor and injecting the dbcontext
        public CarsController(CarsAPIDbContext dbContext, GetUserId getUserId)
        {
            this.dbContext = dbContext;
            this.getUserId = getUserId;
        }


        [HttpGet]
        public async Task<IActionResult> GetCars()
        {
            // returing the list of car in 200 response
            return Ok(await dbContext.Cars.ToListAsync());
        }

        [HttpGet]
        [Route("{car_id:guid}")]
        // Getting single car details
        public async Task<IActionResult> GetCar(Guid car_id)
        {
            // It interacts with the database cars and find that car using id
            var car = await dbContext.Cars.FindAsync(car_id);

            if (car == null)
            {
                return NotFound();
            }
            return Ok(car);
        }


        // Whenever we add car we add http verb post
        [HttpPost]
        // using this we will create a car object
        public async Task<IActionResult> AddCar(AddCarRequest addCarRequest)
        {
            var car = new Cars()
            {
                Car_id = Guid.NewGuid(),
                Car_Name = addCarRequest.Car_Name,
                Car_Model = addCarRequest.Car_Model,
                Year = addCarRequest.Year,
                Color = addCarRequest.Color,
                Rent_Price = addCarRequest.Rent_Price,
                ImageLink = addCarRequest.ImageLink
            };

            await dbContext.Cars.AddAsync(car);
            //saving car object in database 
            await dbContext.SaveChangesAsync();
            //returing the api request
            return Ok(car);
        }

        // Update car method
        [HttpPut]
        [Route("{car_id:guid}")]
        public async Task<IActionResult> UpdateCar(Guid car_id, UpdateCarRequest updateCarRequest)
        {
            var car = await dbContext.Cars.FindAsync(car_id);
            if (car != null)
            {
                car.Car_Name= updateCarRequest.Car_Name;
                car.Car_Model = updateCarRequest.Car_Model;
                car.Year = updateCarRequest.Year;
                car.Color = updateCarRequest.Color;
                car.Rent_Price = updateCarRequest.Rent_Price;
                car.ImageLink = updateCarRequest.ImageLink;

                await dbContext.SaveChangesAsync();
                return Ok(car);
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{car_id:guid}")]
        // Delete Car Method
        public async Task<IActionResult> DeleteCar(Guid car_id)
        {
           var car = await dbContext.Cars.FindAsync(car_id);
           if (car != null)
            {
                dbContext.Cars.Remove(car);
                await dbContext.SaveChangesAsync();
                return Ok(car);
            }
            return NotFound();
        }


        //add car image
        [HttpPost("{carId}/image")]
        public async Task<IActionResult> AddImage(Guid carId, IFormFile documentFile)
        {
            var car = await dbContext.Cars.FindAsync(carId);
            if (car == null)
            {
                return NotFound("Car not found.");
            }

            byte[] documentData = null;
            using (var ms = new MemoryStream())
            {
                await documentFile.CopyToAsync(ms);
                documentData = ms.ToArray();
            }

            // Update the car image in the database
            car.Image = documentData;
            await dbContext.SaveChangesAsync();

            return Ok("Image added successfully.");
        }


        [HttpGet("{carId}/document")]
        public async Task<IActionResult> GetImage(Guid carId)
        {
            var car = await dbContext.Cars.FindAsync(carId);
            if (car == null)
            {
                return NotFound("Car not found.");
            }

            if (car.Image == null)
            {
                return NotFound("Image not found.");
            }

            var documentStream = new MemoryStream(car.Image);
            return File(documentStream, "application/octet-stream", $"{car.Car_Name}.png");
        }


        //add discount to car
        [HttpPut("addDiscount")]
        public async Task<IActionResult> AddDiscount(AddDiscount discount)
        {
            var car = await dbContext.Cars.FindAsync(Guid.Parse(discount.car_id));
            if (car == null)
            {
                return NotFound("Car not found.");
            }
            car.discount = discount.discount;
            await dbContext.SaveChangesAsync();
            return Ok("Discount added successfully.");
        }






        //get currently rented cars
        [HttpGet("/rented")]
        public async Task<IActionResult> GetRentedCars()
        {
            var carRents = await dbContext.Cars.Where(c => c.Availability_Status == "Rented").ToListAsync();
            return Ok(carRents);
        }

        //get currently available cars
        [HttpGet("/available")]
        public async Task<IActionResult> GetAvailableCars()
        {
            var carRents = await dbContext.Cars.Where(c => c.Availability_Status == "Available").ToListAsync();
            return Ok(carRents);
        }

    }
}
