using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class Admin
    {
        [Key]
        public Guid Admin_id { get; set; }
        public string Admin_name { get; set;}
        public string Admin_password { get; set;}
        [Required]
        [EmailAddress]
        public string Admin_email { get; set;}
        public string Role_id { get; set;}
    }
}
