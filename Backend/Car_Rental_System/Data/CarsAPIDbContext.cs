using Car_Rental_System.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Car_Rental_System.Data
{
    // This class inherits from the Db COntext
    public sealed class CarsAPIDbContext : IdentityDbContext
    {
        // Creating constructor where we are passing the options and options are being passed to base class
        public CarsAPIDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
            //Database.Migrate();
        }

        // Creating the properties which acts as tables for entity framework core
        public DbSet<Cars> Cars { get; set; }
    }
}
