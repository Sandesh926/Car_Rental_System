using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Car_Rental_System.Data;
using Car_Rental_System.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
        
        [HttpPost]
        // using this we will create a customer object
        public async Task<IActionResult> AddCustomer(RegisterCustomer registerCustomer)
        {
            // Check if email already exists in the database
            var existingCustomer = await dbContext.Customers.FirstOrDefaultAsync(c => c.Customer_Email == registerCustomer.Customer_Email);
            if (existingCustomer != null)
            {
                return BadRequest("Email already exists in the database.");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerCustomer.Password);
    
            var customer = new Customers()
            {
                Customer_Id = Guid.NewGuid(),
                Customer_firstName = registerCustomer.Customer_firstName,
                Customer_lastName = registerCustomer.Customer_lastName,
                Customer_Phone = registerCustomer.Customer_Phone,
                Customer_Address = registerCustomer.Customer_Address,
                //Cutomer_Document = registerCustomer.Cutomer_Document,
                Customer_Email = registerCustomer.Customer_Email,
                Password = hashedPassword
            };

            await dbContext.Customers.AddAsync(customer);
            await dbContext.SaveChangesAsync();
            return Ok(customer);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(Login loginCustomer)
        {
            var customer = await dbContext.Customers.FirstOrDefaultAsync(c => c.Customer_Email == loginCustomer.Email);
            if (customer == null)
            {
                return NotFound("Customer not found.");
            }
    
            if (!BCrypt.Net.BCrypt.Verify(loginCustomer.Password, customer.Password))
            {
                return BadRequest("Invalid password.");
            }
    
            // Generate a JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("AShfhajfsgahbfjhbashj.asd@shajfhjas"); 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, customer.Customer_Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var loginReply = new LoginReply
            {
                Token = tokenString,
                Email = customer.Customer_Email,
                Name = $"{customer.Customer_firstName} {customer.Customer_lastName}"
            };
            return Ok(loginReply);
        }



    }
}
