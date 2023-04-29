using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class RegisterCustomer
    {
        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        [Phone]
        [Display(Name = "Phone Number")]
        public string Customer_Phone { get; set; }

        [Required]
        [Display(Name = "Address")]
        public string Customer_Address { get; set; }

        [Display(Name = "Documents")]
        public byte[] Cutomer_Document { get; set; }
    }
}