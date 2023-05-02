using Car_Rental_System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Car_Rental_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {

        private readonly CarsAPIDbContext dbContext;

        //create object for GetUserId
        private GetUserId getUserId;

        // Creating a constructor and injecting the dbcontext
        public DashboardController(CarsAPIDbContext dbContext, GetUserId getUserId)
        {
            this.dbContext = dbContext;
            this.getUserId = getUserId;
        }


        //get total number of cars
        [HttpGet("totalcars")]
        public async Task<IActionResult> GetTotalCars()
        {
            var totalCars = await dbContext.Cars.CountAsync();
            return Ok(totalCars);
        }

        //get total number of customers
        [HttpGet("totalcustomers")]
        public async Task<IActionResult> GetTotalCustomers()
        {
            var totalCustomers = await dbContext.Customers.CountAsync();
            return Ok(totalCustomers);
        }

        //get total number of staff
        [HttpGet("totalstaff")]
        public async Task<IActionResult> GetTotalStaff()
        {
            var totalStaff = await dbContext.Staff.CountAsync();
            return Ok(totalStaff);
        }

        //get total  rents
        [HttpGet("totalrents")]
        public async Task<IActionResult> GetTotalRents()
        {
            var totalRents = await dbContext.RentCar.CountAsync();
            return Ok(totalRents);
        }


        //get car rents whose status are pending
        [HttpGet("pendingrents")]
        public async Task<IActionResult> GetPendingRents()
        {
            var pendingRents = await dbContext.RentCar.Where(r => r.Rent_Status == "Pending").CountAsync();
            return Ok(pendingRents);
        }

        //get car rents whose status are paid
        [HttpGet("paidrents")]
        public async Task<IActionResult> GetPaidRents()
        {
            var paidRents = await dbContext.RentCar.Where(r => r.Rent_Status == "Paid").CountAsync();
            return Ok(paidRents);
        }



    }
}
