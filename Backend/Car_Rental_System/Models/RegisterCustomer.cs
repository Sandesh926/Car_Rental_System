using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class RegisterCustomer
    {
        public string Customer_firstName { get; set; }

        public string Customer_lastName { get; set; }
        [Required]
        [EmailAddress]
        public string Customer_Email { get; set; }
        [Required]
        public string Customer_Phone { get; set; }
        [Required]
        public string Customer_Address { get; set; }
        //public byte[]? Cutomer_Document { get; set; }
        //public string Password { get; set; }

        //[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm Password")]
        //public string ConfirmPassword { get; set; }

    }
}