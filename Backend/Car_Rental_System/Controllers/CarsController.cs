using Car_Rental_System.Data;
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

        // Creating a constructor and injecting the dbcontext
        public CarsController(CarsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
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
        public async Task<IActionResult> GetCar([FromRoute] Guid car_id)
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
                Availability_Status = addCarRequest.Availability_Status
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
        public async Task<IActionResult> UpdateCar([FromRoute] Guid car_id, UpdateCarRequest updateCarRequest)
        {
            var car = await dbContext.Cars.FindAsync(car_id);
            if (car != null)
            {
                car.Car_Name= updateCarRequest.Car_Name;
                car.Car_Model = updateCarRequest.Car_Model;
                car.Year = updateCarRequest.Year;
                car.Color = updateCarRequest.Color;
                car.Rent_Price = updateCarRequest.Rent_Price;
                car.Availability_Status = updateCarRequest.Availability_Status;

                await dbContext.SaveChangesAsync();
                return Ok(car);
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{car_id:guid}")]
        // Delete Car Method
        public async Task<IActionResult> DeleteCar([FromRoute] Guid car_id)
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
    }
}
