using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class Login
    {

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
