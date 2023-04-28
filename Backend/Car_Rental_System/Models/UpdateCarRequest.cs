﻿namespace Car_Rental_System.Models
{
    public class UpdateCarRequest
    {
        public string Car_Name { get; set; }
        public string Car_Model { get; set; }
        public int Year { get; set; }
        public string Color { get; set; }
        public string Rent_Price { get; set; }
        public string Availability_Status { get; set; }
    }
}