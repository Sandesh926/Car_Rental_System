using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class Staff
    {
        [Key]
        public Guid Staff_Id { get; set; }
        public string Staff_Name { get; set; }

        [Required]
        [EmailAddress]
        public string Staff_Email { get; set; }

        public string Staff_Password { get; set; }

        public int Rating { get; set; }
      
        public string Staff_Discount { get; set; }

        public int Role_id { get; set; } = 2;
    }
}
