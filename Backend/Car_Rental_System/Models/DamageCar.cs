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
        public Guid Car_id { get; set; }

        [ForeignKey("Customers")]
        public Guid Customer_Id { get; set; }

        [ForeignKey("Staff")]
        public Guid? Staff_Id { get; set; }
        public double? DamageCharge { get; set; }
        public string Charge_status { get; set; } = "Waiting";

        public Cars Cars { get; set; }
        public Customers Customers { get; set; }
        public Staff Staff { get; set; }

    }
}
