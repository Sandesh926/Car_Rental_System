using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;

namespace Car_Rental_System.Models
{
    public class Customers
    {
        [Key]
        public Guid Customer_Id { get; set; }
        public string Customer_firstName { get; set; }

        public string Customer_lastName { get; set; }

        [Required]
        [EmailAddress]
        public string Customer_Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Customer_Phone { get; set; }
        [Required]
        public string Customer_Address { get; set; }
        
        public byte[]? Customer_Document { get; set; }
        public bool IsRegular { get; set; } = false;
        public decimal? RegularDiscount { get; set; }
        public DateTime? LastRentalDate { get; set; }
        public DateTime RegistrationDate { get; set; } = DateTime.Now;

        public int Role_id { get; set; } = 3;
    }
}
