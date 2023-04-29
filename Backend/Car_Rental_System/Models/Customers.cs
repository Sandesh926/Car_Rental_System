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
        public long Customer_Phone { get; set; }
        [Required]
        public string Customer_Address { get; set; } 
        public byte[]? Cutomer_Document { get; set; }
        public bool IsRegular { get; set; }
        public decimal RegularDiscount { get; set; }
        public DateTime? LastRentalDate { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
