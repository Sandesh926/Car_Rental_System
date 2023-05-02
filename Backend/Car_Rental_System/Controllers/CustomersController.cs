using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Car_Rental_System;
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

        //create object for GetUserId
        private GetUserId getUserId;

        // Creating a constructor and injecting the dbcontext
        public CustomersController(CarsAPIDbContext dbContext, GetUserId getUserId)
        {
            this.dbContext = dbContext;
            this.getUserId = getUserId;
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



        //IMPORTANT: TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //upload image for customer
        [HttpPost("document")]
        public async Task<IActionResult> AddDocument(IFormFile documentFile)
        {
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(tokenString))
            {
                return BadRequest("Token is empty.");
            }
            var customerId = getUserId.GetUserIdFromToken(tokenString);


            var customer = await dbContext.Customers.FindAsync(Guid.Parse(customerId));
            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            string fileName = documentFile.FileName;
            string fileExtension = Path.GetExtension(fileName);

            byte[] documentData = null;
            using (var ms = new MemoryStream())
            {
                await documentFile.CopyToAsync(ms);
                documentData = ms.ToArray();
            }

            // Update the customer's document in the database
            customer.Customer_Document = documentData;
            customer.Document_Type = fileExtension;
            await dbContext.SaveChangesAsync();

            return Ok("Document added successfully.");
        }



        //IMPORTANT: TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //TOKEN IS REQUIRED, SEND IT IN THE HEADER
        //get own document
        [HttpGet("document")]
        public async Task<IActionResult> GetOwnDocument()
        {
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(tokenString))
            {
                return BadRequest("Token is empty.");
            }
            var customerId = getUserId.GetUserIdFromToken(tokenString);
            var customer = await dbContext.Customers.FindAsync(customerId);
            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            if (customer.Customer_Document == null)
            {
                return NotFound("Document not found.");
            }
            var documentStream = new MemoryStream(customer.Customer_Document);
            var contentType = customer.Document_Type;
            return File(documentStream, "application/octet-stream", $"{customer.Customer_firstName}{contentType}");
        }


        [HttpGet("{customerId}/document")]
        public async Task<IActionResult> GetDocument(Guid customerId)
        {
            var customer = await dbContext.Customers.FindAsync(customerId);
            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            if (customer.Customer_Document == null)
            {
                return NotFound("Document not found.");
            }

            var documentStream = new MemoryStream(customer.Customer_Document);
            var contentType = customer.Document_Type;
            return File(documentStream, "application/octet-stream", $"{customer.Customer_firstName}{contentType}");
        }


        //get all customers
        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await dbContext.Customers.ToListAsync();
            return Ok(customers);
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
            var customerId = getUserId.GetUserIdFromToken(tokenString);
            var customer = await dbContext.Customers.FindAsync(Guid.Parse(customerId));
            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            if (!BCrypt.Net.BCrypt.Verify(changePassword.OldPassword, customer.Password))
            {
                return BadRequest("Invalid password.");
            }
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(changePassword.NewPassword);
            customer.Password = hashedPassword;
            await dbContext.SaveChangesAsync();
            return Ok("Password changed successfully.");
        }


        //check if user is regular or not
        [HttpGet("isRegular")]
        public async Task<IActionResult> IsRegular()
        {
            string tokenString = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(tokenString))
            {
                return BadRequest("Token is empty.");
            }
            var customerId = getUserId.GetUserIdFromToken(tokenString);
            var customer = await dbContext.Customers.FindAsync(Guid.Parse(customerId));
            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            if (customer.IsRegular)
            {
                return Ok("Customer is regular.");
            }
            else
            {
                return Ok("Customer is not regular.");
            }
        }
        



    }
}
