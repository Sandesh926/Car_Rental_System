using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class LoginCustomer
    {

        [Required]
        [EmailAddress]
        public string Customer_Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
