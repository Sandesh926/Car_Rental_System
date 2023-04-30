using Car_Rental_System.Data;
using Car_Rental_System.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> AddCarRent(RentCar carRent)
        {
            var car = await dbContext.Cars.FirstOrDefaultAsync(c => c.Car_id.ToString() == carRent.Car_id);
            if (car == null)
            {
                return BadRequest("Car does not exist in the database.");
            }
            var customer = await dbContext.Customers.FirstOrDefaultAsync(c => c.Customer_Id.ToString() == carRent.Customer_id);
            if (customer == null)
            {
                return BadRequest("Customer does not exist in the database.");
            }
            var carRentObj = new RentCar()
            {
                Rent_id = Guid.NewGuid(),
                Rent_date = carRent.Rent_date,
                Car_id = carRent.Car_id.ToString(),
                Customer_id = customer.Customer_Id.ToString(),
                Staff_id = carRent.Staff_id.ToString(),
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
        [HttpPut]
        public async Task<IActionResult> AcceptCarRent(string car_id, string staff_id)
        {
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
            carRentObj.Staff_id = staff_id;
            carRentObj.Rent_Status = "Rented";
            await dbContext.SaveChangesAsync();
            return Ok(carRentObj);
        }

        //Change rent status to rejected
        [HttpPut]
        public async Task<IActionResult> RejectCarRent(string car_id, string staff_id)
        {
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
            carRentObj.Staff_id = staff_id;
            carRentObj.Rent_Status = "Rejected";
            await dbContext.SaveChangesAsync();
            return Ok(carRentObj);
        }

        
    }
}
