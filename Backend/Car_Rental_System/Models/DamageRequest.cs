using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class DamageRequest
    {
        [Key]
        public Guid Request_id { get; set; }
        public DateOnly DamageDate { get; set; }

        public int car_id { get; set; }
        public int customer_id { get; set; }
    }
}
