using System.IdentityModel.Tokens.Jwt;
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

        //create object for GetUserId
        private GetUserId getUserId;

        // Creating a constructor and injecting the dbcontext
        public CarRentController(CarsAPIDbContext dbContext, GetUserId getUserId)
        {
            this.dbContext = dbContext;
            this.getUserId = getUserId;
        }


        //Add Car Rent to database 
        [HttpPost]
        public async Task<IActionResult> AddCarRent(RentCarRequest carRent)
        {

            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(tokenString))
            {
                return BadRequest("Token is empty.");
            }
            var userID = getUserId.GetUserIdFromToken(tokenString);
            var customer = await dbContext.Customers.FirstOrDefaultAsync(c => c.Customer_Id.ToString() == userID);
            var staff = await dbContext.Staff.FirstOrDefaultAsync(c => c.Staff_Id.ToString() == userID);

            string customer_id = "";
            string staff_id = "";
            
            //find car by id
            var car = await dbContext.Cars.FirstOrDefaultAsync(c => c.Car_id.ToString() == carRent.Car_id);
            if (car == null)
            {
                return BadRequest("Car does not exist in the database.");
            }

            //check if car is available
            if (car.Availability_Status == "Rented")
            {
                return BadRequest("Car is already rented.");
            }

            double discount = car.discount;

            if (customer != null)
            {
                //find all customer damage record and see if there is any pending payment
                var customerDamage = await dbContext.DamageCar.FirstOrDefaultAsync(c => c.Customer_Id.ToString() == customer.Customer_Id.ToString() && c.Charge_status != "Paid");
                if (customerDamage!=null)
                {
                    return BadRequest("Customer has pending damage payment.");
                }
                
                if (customer.Customer_Document.IsNullOrEmpty())
                {
                    return BadRequest("Customer has not added their document yet.");
                }
                carRent.User_Type = "customer";
                customer_id = customer.Customer_Id.ToString();
                if (customer.IsRegular)
                {
                    discount = discount + 0.1;
                }
                var carRentObj = new RentCar()
                {
                    Rent_id = Guid.NewGuid(),
                    Rent_date_From = carRent.Rent_date_From.ToDateTime(TimeOnly.MinValue),
                    Rent_date_To = carRent.Rent_date_To.ToDateTime(TimeOnly.MaxValue),
                    Car_id = Guid.Parse(carRent.Car_id),
                    Staff_Id = null,
                    Customer_Id = Guid.Parse(customer_id),
                    Rent_Status = carRent.Rent_Status,
                    Discount = discount
                };
                await dbContext.RentCar.AddAsync(carRentObj);
                await dbContext.SaveChangesAsync();

            }
            else if (staff != null)
            {
                carRent.User_Type = "staff";
                staff_id = staff.Staff_Id.ToString();
                discount = discount + 0.25;
                
                var carRentObj = new RentCar()
                {
                    Rent_id = Guid.NewGuid(),
                    Rent_date_From = carRent.Rent_date_From.ToDateTime(TimeOnly.MinValue),
                    Rent_date_To = carRent.Rent_date_To.ToDateTime(TimeOnly.MaxValue),
                    Car_id = Guid.Parse(carRent.Car_id),
                    Customer_Id = null,
                    Staff_Id = Guid.Parse(staff_id),
                    Rent_Status = "Accepted",
                    Discount = discount,
                    ApprovedBy = staff.Staff_Name
                };
                var Car = await dbContext.Cars.FirstOrDefaultAsync(c => c.Car_id == carRentObj.Car_id);
                Car.Availability_Status = "Rented";
                await dbContext.RentCar.AddAsync(carRentObj);
                await dbContext.SaveChangesAsync();
            }
            else
            {
                return BadRequest("User does not exist in the database.");
            }

            
            return Ok("Successfully Rented.");


        }

        //get all car rents with pending status
        [HttpGet("pending")]
        public async Task<IActionResult> GetAllPendingCarRents()
        {
            var carRents = await (from rc in dbContext.RentCar
                join c in dbContext.Cars on rc.Car_id equals c.Car_id
                join cu in dbContext.Customers on rc.Customer_Id equals cu.Customer_Id
                where rc.Rent_Status == "Pending"
                select new
                {
                    rc.Rent_id,
                    rc.Rent_date_From,
                    rc.Rent_date_To,
                    CarName = c.Car_Name,
                    CustomerName = cu.Customer_firstName + " " + cu.Customer_lastName,
                    rc.ApprovedBy,
                    rc.Discount,
                    rc.Rent_Status
                }).ToListAsync();
            return Ok(carRents);
        }


        //cancel car rent
        [HttpPut("/cancel/{id}")]
        public async Task<IActionResult> CancelCarRent(string id)
        {
            var carRent = await dbContext.RentCar.FirstOrDefaultAsync(c => c.Rent_id.ToString() == id);
            if (carRent == null)
            {
                return NotFound();
            }
            carRent.Rent_Status = "Cancelled";
            await dbContext.SaveChangesAsync();
            return Ok(carRent);
        }



        //Get all car rents from database
        [HttpGet]
        public async Task<IActionResult> GetAllCarRents()
        {
            var carRents = await (from rc in dbContext.RentCar
                join c in dbContext.Cars on rc.Car_id equals c.Car_id
                join cu in dbContext.Customers on rc.Customer_Id equals cu.Customer_Id
                select new
                {
                    rc.Rent_id,
                    rc.Rent_date_From,
                    rc.Rent_date_To,
                    CarName = c.Car_Name,
                    CustomerName = cu.Customer_firstName + " "+ cu.Customer_lastName,
                    rc.ApprovedBy,
                    rc.Discount,
                    rc.Rent_Status
                }).ToListAsync();

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
        [HttpPut("/accept/{car_id}")]
        public async Task<IActionResult> AcceptCarRent(string car_id)
        {

            //check if current time is between 9am and 5pm
            var time = DateTime.Now;
            if (time.Hour <= 9 && time.Hour >= 17)
            {
                return BadRequest("This operation can only be done between 9am to 5pm.");
            }

            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(tokenString))
            {
                return BadRequest("Token is empty.");
            }
            var staff_id = getUserId.GetUserIdFromToken(tokenString);

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

            if (!carRentObj.Customer_Id.ToString().IsNullOrEmpty())
            {
                var customer = await dbContext.Customers.FirstOrDefaultAsync(c => c.Customer_Id == carRentObj.Customer_Id);
                customer.LastRentalDate = DateTime.Now;
                //count if there are more than 3 rentals of car by this user in the last 3 months
                var count = await dbContext.RentCar.Where(c => c.Customer_Id == carRentObj.Customer_Id && c.Rent_date_From >= DateTime.Now.AddMonths(-3)).CountAsync();
                if (count >= 3)
                {
                    customer.IsRegular = true;
                    
                }
                else
                {
                    customer.IsRegular = false;
                    
                }
                await dbContext.SaveChangesAsync();
            }

            //change car status to rented
            var car = await dbContext.Cars.FirstOrDefaultAsync(c => c.Car_id == carRentObj.Car_id);
            car.Availability_Status = "Rented";
            carRentObj.ApprovedBy = staff.Staff_Name;
            carRentObj.Rent_Status = "Accepted";
            await dbContext.SaveChangesAsync();
            return Ok(carRentObj);
        }




        //Change rent status to rejected
        //IMPORTANT: TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        [HttpPut("/reject/{car_id}")]
        public async Task<IActionResult> RejectCarRent(string car_id)
        {
            var time = DateTime.Now;
            if (time.Hour <= 9 && time.Hour >= 17)
            {
                return BadRequest("This operation can only be done between 9am to 5pm.");
            }
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(tokenString))
            {
                return BadRequest("Token is empty.");
            }
            var staff_id = getUserId.GetUserIdFromToken(tokenString);
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
            carRentObj.ApprovedBy = staff.Staff_Name;
            carRentObj.Rent_Status = "Rejected";
            await dbContext.SaveChangesAsync();
            return Ok(carRentObj);
        }


        //make rent status to paid
        [HttpPut("/pay/{car_id}")]
        public async Task<IActionResult> PayCarRent(string car_id)
        {
            var carRentObj = await dbContext.RentCar.FirstOrDefaultAsync(c => c.Rent_id.ToString() == car_id);
            if (carRentObj == null)
            {
                return NotFound();
            }
            carRentObj.Rent_Status = "Paid";
            await dbContext.SaveChangesAsync();
            return Ok(carRentObj);
        }


        //make rent status to returned
        [HttpPut("/return/{car_id}")]
        public async Task<IActionResult> ReturnCarRent(string car_id)
        {
            var time = DateTime.Now;
            if (time.Hour <= 9 || time.Hour >= 17)
            {
                return BadRequest("This operation can only be done between 9am to 5pm.");
            }
            var carRentObj = await dbContext.RentCar.FirstOrDefaultAsync(c => c.Rent_id.ToString() == car_id);
            if (carRentObj == null)
            {
                return NotFound();
            }
            carRentObj.Rent_Status = "Returned";
            //set car status to available
            var car = await dbContext.Cars.FirstOrDefaultAsync(c => c.Car_id== carRentObj.Car_id);
            car.Availability_Status = "Available";
            await dbContext.SaveChangesAsync();
            return Ok(carRentObj);
        }




        //check your car rents
        //IMPORTANT: TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        [HttpGet("/myrents")]
        public async Task<IActionResult> GetMyCarRents()
        {
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(tokenString))
            {
                return BadRequest("Token is empty.");
            }
            var id = getUserId.GetUserIdFromToken(tokenString);

            var carRents = await dbContext.RentCar
                .Where(r => r.Customer_Id.ToString() == id)
                .Select(r => new 
                {
                    r.Rent_id,
                    r.Rent_date_From,
                    r.Rent_date_To,
                    r.Car_id,
                    CarName = r.Cars.Car_Name,
                    r.Customer_Id,
                    CustomerName = $"{r.Customers.Customer_firstName} {r.Customers.Customer_lastName}",
                    r.Staff_Id,
                    StaffName = r.Staff.Staff_Name,
                    r.ApprovedBy,
                    r.Discount,
                    r.Rent_Status
                })
                .ToListAsync();



            return Ok(carRents);
        }



        [HttpGet("/frequentlyRented")]
        public async Task<IActionResult> GetFrequentlyRentedCars()
        {
            var frequentlyRentedCars = await (from c in dbContext.Cars
                join rc in dbContext.RentCar on c.Car_id equals rc.Car_id
                group c by c.Car_id into g
                orderby g.Count() descending
                select g.First())
                .ToListAsync();

            return Ok(frequentlyRentedCars);
        }



        [HttpGet("/neverRented")]
        public async Task<IActionResult> GetNeverRentedCars()
        {
            var neverRentedCars = await (from c in dbContext.Cars
                join rc in dbContext.RentCar on c.Car_id equals rc.Car_id into gj
                from subrc in gj.DefaultIfEmpty()
                where subrc == null
                select c)
                .ToListAsync();

            return Ok(neverRentedCars);
        }


        
    }
}
