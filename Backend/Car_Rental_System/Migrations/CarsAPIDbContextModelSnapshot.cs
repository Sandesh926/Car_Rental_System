﻿// <auto-generated />
using System;
using Car_Rental_System.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Car_Rental_System.Migrations
{
    [DbContext(typeof(CarsAPIDbContext))]
    partial class CarsAPIDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Car_Rental_System.Models.Admin", b =>
                {
                    b.Property<Guid>("Admin_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Admin_email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Admin_name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Admin_password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role_id")
                        .HasColumnType("int");

                    b.HasKey("Admin_id");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("Car_Rental_System.Models.Cars", b =>
                {
                    b.Property<Guid>("Car_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Availability_Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Car_Model")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Car_Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("ImageLink")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rent_Price")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.Property<double>("discount")
                        .HasColumnType("float");

                    b.HasKey("Car_id");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("Car_Rental_System.Models.Customers", b =>
                {
                    b.Property<Guid>("Customer_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Customer_Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Customer_Document")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Customer_Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Customer_Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Customer_firstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Customer_lastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Document_Type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsRegular")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("LastRentalDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime2");

                    b.Property<double?>("RegularDiscount")
                        .HasColumnType("float");

                    b.Property<int>("Role_id")
                        .HasColumnType("int");

                    b.HasKey("Customer_Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Car_Rental_System.Models.DamageCar", b =>
                {
                    b.Property<Guid>("Damage_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Car_id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Car_id1")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Charge_status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("Customer_Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Customer_Id1")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double?>("DamageCharge")
                        .HasColumnType("float");

                    b.Property<DateTime>("DamageDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("Staff_Id")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Damage_id");

                    b.HasIndex("Car_id1");

                    b.HasIndex("Customer_Id1");

                    b.HasIndex("Staff_Id");

                    b.ToTable("DamageCar");
                });

            modelBuilder.Entity("Car_Rental_System.Models.RentCar", b =>
                {
                    b.Property<Guid>("Rent_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ApprovedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("Car_id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Car_id1")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("Customer_Id")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("Customer_Id1")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double?>("Discount")
                        .HasColumnType("float");

                    b.Property<string>("Rent_Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Rent_date_From")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Rent_date_To")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("Staff_Id")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Rent_id");

                    b.HasIndex("Car_id1");

                    b.HasIndex("Customer_Id1");

                    b.HasIndex("Staff_Id");

                    b.ToTable("RentCar");
                });

            modelBuilder.Entity("Car_Rental_System.Models.Staff", b =>
                {
                    b.Property<Guid>("Staff_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("Role_id")
                        .HasColumnType("int");

                    b.Property<string>("Staff_Discount")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Staff_Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Staff_Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Staff_Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Staff_Id");

                    b.ToTable("Staff");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Car_Rental_System.Models.DamageCar", b =>
                {
                    b.HasOne("Car_Rental_System.Models.Cars", "Car")
                        .WithMany()
                        .HasForeignKey("Car_id1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Car_Rental_System.Models.Customers", "Customer")
                        .WithMany()
                        .HasForeignKey("Customer_Id1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Car_Rental_System.Models.Staff", "Staff")
                        .WithMany()
                        .HasForeignKey("Staff_Id");

                    b.Navigation("Car");

                    b.Navigation("Customer");

                    b.Navigation("Staff");
                });

            modelBuilder.Entity("Car_Rental_System.Models.RentCar", b =>
                {
                    b.HasOne("Car_Rental_System.Models.Cars", "Car")
                        .WithMany()
                        .HasForeignKey("Car_id1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Car_Rental_System.Models.Customers", "Customer")
                        .WithMany()
                        .HasForeignKey("Customer_Id1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Car_Rental_System.Models.Staff", "Staff")
                        .WithMany()
                        .HasForeignKey("Staff_Id");

                    b.Navigation("Car");

                    b.Navigation("Customer");

                    b.Navigation("Staff");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
