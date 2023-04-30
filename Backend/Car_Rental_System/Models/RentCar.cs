using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class RentCar
    {
        [Key]
        public Guid Rent_id { get; set; }
        public DateTime Rent_date_From { get; set; }

        public DateTime Rent_date_To { get; set; }

        public string Car_id { get; set; }
        public string Customer_id { get; set; }
        public string Staff_id { get; set; }
        public string Rent_Status { get; set; }
    }
}
