using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeVacationCalendar.WebAPI.Database.Migrations
{
    public partial class CalendarEntrytimestamp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "3b7913ad-29fa-45f7-a88a-2a52de4efe9b", "e463098f-f519-4b00-a276-36a055921b26" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "3ff89c09-e3b8-4209-94c5-280f529965e2", "1df83299-ce32-4f99-928a-2f15638005ca" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "4b1f56ed-ba8c-4cc5-827d-eeaac10369b9", "a3fd5376-7a8a-4010-b9d8-f982870633c9" });

            migrationBuilder.AddColumn<byte[]>(
                name: "ConcurrencyStamp",
                table: "CalendarEntries",
                rowVersion: true,
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "CalendarEntries");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3ff89c09-e3b8-4209-94c5-280f529965e2", "1df83299-ce32-4f99-928a-2f15638005ca", "MasterAdmin", "MASTERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4b1f56ed-ba8c-4cc5-827d-eeaac10369b9", "a3fd5376-7a8a-4010-b9d8-f982870633c9", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3b7913ad-29fa-45f7-a88a-2a52de4efe9b", "e463098f-f519-4b00-a276-36a055921b26", "User", "USER" });
        }
    }
}
