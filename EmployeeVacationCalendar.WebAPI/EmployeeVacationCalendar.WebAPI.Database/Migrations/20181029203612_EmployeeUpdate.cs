using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeVacationCalendar.WebAPI.Database.Migrations
{
    public partial class EmployeeUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "4ef378b5-0435-408f-ba6f-68ae95602077", "8e8ebc13-89f5-4173-a5d6-e300a41b01b4" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "73513eb5-45f0-40d4-aff7-69ee20dda769", "e52c5d36-5631-46fb-85c8-b10e154c8516" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "d2de7ae7-293e-4f18-b3ae-f38fe12720df", "9ccc782b-e6bc-4bf0-9712-c28354aa8dac" });

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "AspNetUserTokens",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "LoginProvider",
                table: "AspNetUserTokens",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 128);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeType",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "ProviderKey",
                table: "AspNetUserLogins",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "LoginProvider",
                table: "AspNetUserLogins",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 128);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "275df99b-f636-4ce9-8b0e-d675b90f97d7", "c42d8a66-111d-4562-ae25-367331a11e30", "MasterAdmin", "MASTERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3d22e071-38d5-43a2-bcb8-c919228b3a78", "488140bf-278f-4f74-b072-3048c62cf4d1", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b06c6a86-bfbe-41c2-88e1-5d92546a2ab7", "19910a56-5e44-4870-a3be-9d514103c8d7", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "275df99b-f636-4ce9-8b0e-d675b90f97d7", "c42d8a66-111d-4562-ae25-367331a11e30" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "3d22e071-38d5-43a2-bcb8-c919228b3a78", "488140bf-278f-4f74-b072-3048c62cf4d1" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "b06c6a86-bfbe-41c2-88e1-5d92546a2ab7", "19910a56-5e44-4870-a3be-9d514103c8d7" });

            migrationBuilder.DropColumn(
                name: "EmployeeType",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "AspNetUserTokens",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "LoginProvider",
                table: "AspNetUserTokens",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "ProviderKey",
                table: "AspNetUserLogins",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "LoginProvider",
                table: "AspNetUserLogins",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d2de7ae7-293e-4f18-b3ae-f38fe12720df", "9ccc782b-e6bc-4bf0-9712-c28354aa8dac", "MasterAdmin", "MASTERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "73513eb5-45f0-40d4-aff7-69ee20dda769", "e52c5d36-5631-46fb-85c8-b10e154c8516", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4ef378b5-0435-408f-ba6f-68ae95602077", "8e8ebc13-89f5-4173-a5d6-e300a41b01b4", "User", "USER" });
        }
    }
}
