using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeVacationCalendar.WebAPI.Database.Migrations
{
    public partial class FKNavigation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "0e1fef60-cd38-41fc-ae97-d152b32d4dc1", "0d8dcda8-823e-4274-8b8d-be41f702380b" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "545bf0ea-a829-4f6a-9146-c3f0b89312c3", "41d35130-1141-4495-9c82-e13090dd679c" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "b0e17d5d-615e-4c4f-b6e4-8321fffc8071", "871915ca-0660-4dfb-b399-affe05dc98bc" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d3a435da-5964-47df-ac89-723cf021633a", "0d35e5c8-8c62-44c5-be89-7dc286c4f6a0", "MasterAdmin", "MASTERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e1901ad7-9aec-4816-8c1a-bcc3c54d10c4", "63585612-2b78-438f-8f3d-31ffed3161d8", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8c6082ab-9ac1-4cd4-83df-31ad777aaf92", "62eddfd6-5757-40ad-8144-fedb28aabac8", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "8c6082ab-9ac1-4cd4-83df-31ad777aaf92", "62eddfd6-5757-40ad-8144-fedb28aabac8" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "d3a435da-5964-47df-ac89-723cf021633a", "0d35e5c8-8c62-44c5-be89-7dc286c4f6a0" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "e1901ad7-9aec-4816-8c1a-bcc3c54d10c4", "63585612-2b78-438f-8f3d-31ffed3161d8" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "545bf0ea-a829-4f6a-9146-c3f0b89312c3", "41d35130-1141-4495-9c82-e13090dd679c", "MasterAdmin", "MASTERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0e1fef60-cd38-41fc-ae97-d152b32d4dc1", "0d8dcda8-823e-4274-8b8d-be41f702380b", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b0e17d5d-615e-4c4f-b6e4-8321fffc8071", "871915ca-0660-4dfb-b399-affe05dc98bc", "User", "USER" });
        }
    }
}
