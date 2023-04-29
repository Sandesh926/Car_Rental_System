using System.ComponentModel.DataAnnotations;

namespace Car_Rental_System.Models
{
    public class DamageCar
    {
        [Key]
        public Guid Damage_id { get; set; }
        public DateOnly DamageDate{ get; set; }

        public int car_id { get; set; }
        public int customer_id { get; set; }
        public int staff_id { get; set; }
        public decimal DamageCharge { get; set; }
        public string Charge_status { get; set; }

    }
}
