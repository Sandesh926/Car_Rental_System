using Car_Rental_System.Data;
using Car_Rental_System.Models;
using Microsoft.AspNetCore.Mvc;

namespace Car_Rental_System.Controllers
{
    // annotating the controller and telling this is an api controller not mvc controller
    [ApiController]
    // Route the controller and we are writing the name controller because it gives the controller name which is cars
    [Route("api/[controller]")]
    public class CustomersController : Controller
    {
        // this is used to talk to in-memory database
        private readonly CarsAPIDbContext dbContext;

        // Creating a constructor and injecting the dbcontext
        public CustomersController(CarsAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        //[HttpGet]
        //public async Task<IActionResult> GetCars()
        //{
        //    // returing the list of car in 200 response
        //    return Ok(await dbContext.Cars.ToListAsync());
        //}

        //[HttpGet]
        //[Route("{car_id:guid}")]
        //// Getting single car details
        //public async Task<IActionResult> GetCar([FromRoute] Guid car_id)
        //{
        //    // It interacts with the database cars and find that car using id
        //    var car = await dbContext.Cars.FindAsync(car_id);

        //    if (car == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(car);
        //}


        // Whenever we add car we add http verb post
        [HttpPost]
        // using this we will create a customer object
        public async Task<IActionResult> AddCustomer(RegisterCustomer registerCustomer)
        {
            var customer = new Customers()
            {
                Customer_Id = Guid.NewGuid(),
                Customer_firstName = registerCustomer.Customer_firstName,
                Customer_lastName = registerCustomer.Customer_lastName,
                Customer_Phone = registerCustomer.Customer_Phone,
                Customer_Address = registerCustomer.Customer_Address,
                //Cutomer_Document = registerCustomer.Cutomer_Document,
                Customer_Email = registerCustomer.Customer_Email,
                //Password = registerCustomer.Password
            };

            await dbContext.Customers.AddAsync(customer);
            //saving customer object in database 
            await dbContext.SaveChangesAsync();
            //returing the api request
            return Ok(customer);
        }

        // Update car method
        //[HttpPut]
        //[Route("{car_id:guid}")]
        //public async Task<IActionResult> UpdateCar([FromRoute] Guid car_id, UpdateCarRequest updateCarRequest)
        //{
        //    var car = await dbContext.Cars.FindAsync(car_id);
        //    if (car != null)
        //    {
        //        car.Car_Name = updateCarRequest.Car_Name;
        //        car.Car_Model = updateCarRequest.Car_Model;
        //        car.Year = updateCarRequest.Year;
        //        car.Color = updateCarRequest.Color;
        //        car.Rent_Price = updateCarRequest.Rent_Price;
        //        car.Availability_Status = updateCarRequest.Availability_Status;

        //        await dbContext.SaveChangesAsync();
        //        return Ok(car);
        //    }
        //    return NotFound();
        //}
    }
}
