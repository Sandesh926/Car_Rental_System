using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class SalesRecords
    {
        [Key]
        public Guid Sale_id { get; set; }

        public int car_id { get; set; }
        public int customer_id { get; set; }
        public int rent_id { get; set;}
        public int staff_id { get; set;}

    }
}
