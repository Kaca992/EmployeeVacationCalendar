using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeVacationCalendar.WebAPI.Database.Migrations
{
    public partial class CalendarEntryDatecolumntype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "c6564dd9-eac7-4914-bee1-7cad460c0b70", "0a40fc61-4bd4-402f-90aa-54d0636e1bb9" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "d58b8af9-e117-4c61-a5f9-6ad4e8a118d0", "94afc33b-708e-4a5d-85b0-720ead564c84" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "f3988ab0-4a17-4344-a8f4-2b3a065e98f8", "2d431931-b53b-4f83-b0b0-6160b7e55ad7" });

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "CalendarEntries",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "CalendarEntries",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime));

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<DateTime>(
                name: "StartDate",
                table: "CalendarEntries",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "CalendarEntries",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f3988ab0-4a17-4344-a8f4-2b3a065e98f8", "2d431931-b53b-4f83-b0b0-6160b7e55ad7", "MasterAdmin", "MASTERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c6564dd9-eac7-4914-bee1-7cad460c0b70", "0a40fc61-4bd4-402f-90aa-54d0636e1bb9", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d58b8af9-e117-4c61-a5f9-6ad4e8a118d0", "94afc33b-708e-4a5d-85b0-720ead564c84", "User", "USER" });
        }
    }
}
