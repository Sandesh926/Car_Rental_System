using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class DamageRequest
    {
        public DateOnly DamageDate { get; set; }

        public string car_id { get; set; }
    }
}
