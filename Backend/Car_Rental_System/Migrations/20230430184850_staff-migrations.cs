using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Car_Rental_System.Migrations
{
    /// <inheritdoc />
    public partial class staffmigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "staff_id",
                table: "RentCar",
                newName: "Staff_id");

            migrationBuilder.RenameColumn(
                name: "customer_id",
                table: "RentCar",
                newName: "Customer_id");

            migrationBuilder.RenameColumn(
                name: "car_id",
                table: "RentCar",
                newName: "Car_id");

            migrationBuilder.RenameColumn(
                name: "Rent_date",
                table: "RentCar",
                newName: "Rent_date_To");

            migrationBuilder.AlterColumn<string>(
                name: "Staff_id",
                table: "RentCar",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Customer_id",
                table: "RentCar",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Car_id",
                table: "RentCar",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "Rent_date_From",
                table: "RentCar",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<byte[]>(
                name: "Cutomer_Document",
                table: "Customers",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Role_id",
                table: "Customers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Cars",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AlterColumn<int>(
                name: "Role_id",
                table: "Admin",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Staff",
                columns: table => new
                {
                    Staff_Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Staff_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Staff_Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Staff_Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    Staff_Discount = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.Staff_Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Staff");

            migrationBuilder.DropColumn(
                name: "Rent_date_From",
                table: "RentCar");

            migrationBuilder.DropColumn(
                name: "Role_id",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "Staff_id",
                table: "RentCar",
                newName: "staff_id");

            migrationBuilder.RenameColumn(
                name: "Customer_id",
                table: "RentCar",
                newName: "customer_id");

            migrationBuilder.RenameColumn(
                name: "Car_id",
                table: "RentCar",
                newName: "car_id");

            migrationBuilder.RenameColumn(
                name: "Rent_date_To",
                table: "RentCar",
                newName: "Rent_date");

            migrationBuilder.AlterColumn<int>(
                name: "staff_id",
                table: "RentCar",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "customer_id",
                table: "RentCar",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "car_id",
                table: "RentCar",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Cutomer_Document",
                table: "Customers",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Role_id",
                table: "Admin",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
