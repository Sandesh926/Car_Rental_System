using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class RentCar
    {
        [Key]
        public Guid Rent_id { get; set; }
        public DateOnly Rent_date { get; set; }

        public int car_id { get; set; }
        public int customer_id { get; set; }
        public int staff_id { get; set; }
        public string Rent_Status { get; set; }
    }
}
