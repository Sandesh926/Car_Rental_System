using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Car_Rental_System.Models
{
    public class DamageCar
    {
        [Key]
        public Guid Damage_id { get; set; }
        public DateTime DamageDate{ get; set; }

        [ForeignKey("Cars")]
        public string car_id { get; set; }

        [ForeignKey("Customers")]
        public string customer_id { get; set; }

        [ForeignKey("Staff")]
        public string? staff_id { get; set; }
        public double? DamageCharge { get; set; }
        public string Charge_status { get; set; } = "Waiting";

    }
}
