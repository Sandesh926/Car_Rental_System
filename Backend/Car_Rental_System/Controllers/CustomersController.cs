using Microsoft.AspNetCore.Mvc;

namespace Car_Rental_System.Controllers
{
    public class CustomersController : Controller
    {
        [ApiController]
        public IActionResult Index()
        {
            return View();
        }
    }
}
