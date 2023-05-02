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
        public Guid Car_id { get; set; }

        [ForeignKey("Customers")]
        public Guid? Customer_Id { get; set; }

        [ForeignKey("Staff")]
        public Guid? Staff_Id { get; set; }

        public string? ApprovedBy { get; set; }

        public double? Discount { get; set; }

        public string Rent_Status { get; set; } = "Pending";
    }
}
