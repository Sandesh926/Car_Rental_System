using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class Roles
    {
        [Key]
        public Guid Role_id { get; set; }
        public string Role_name { get; set; }
    } 
}
