using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Car_Rental_System.Models
{
    public class RentCar
    {
        [Key]
        public Guid Rent_id { get; set; }
        public DateTime Rent_date_From { get; set; }

        public DateTime Rent_date_To { get; set; }

        [ForeignKey("Cars")]
        public string Car_id { get; set; }

        [ForeignKey("Customers")]
        public string Customer_id { get; set; }

        [ForeignKey("Customers")]
        public string? Staff_id { get; set; }
        public string Rent_Status { get; set; }
    }
}
