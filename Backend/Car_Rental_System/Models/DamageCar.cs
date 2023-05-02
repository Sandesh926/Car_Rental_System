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
        public Guid car_id { get; set; }
        public virtual Cars Car { get; set; }

        [ForeignKey("Customers")]
        public Guid customer_id { get; set; }
        public virtual Customers Customer { get; set; }

        [ForeignKey("Staff")]
        public Guid? staff_id { get; set; }
        public virtual Staff Staff { get; set; }
        public double? DamageCharge { get; set; }
        public string Charge_status { get; set; } = "Waiting";

    }
}
