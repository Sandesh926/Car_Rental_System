using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class RegisterStaff
    {
        public string Staff_Name { get; set; }

        [Required]
        [EmailAddress]
        public string Staff_Email { get; set; }

        public string Staff_Password { get; set; }

    }
}
