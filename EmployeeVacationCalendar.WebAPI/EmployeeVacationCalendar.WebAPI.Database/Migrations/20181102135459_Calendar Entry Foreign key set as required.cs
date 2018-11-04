using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeVacationCalendar.WebAPI.Database.Migrations
{
    public partial class CalendarEntryForeignkeysetasrequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalendarEntries_AspNetUsers_EmployeeId1",
                table: "CalendarEntries");

            migrationBuilder.DropIndex(
                name: "IX_CalendarEntries_EmployeeId1",
                table: "CalendarEntries");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "1ed2c825-fbd2-4e50-89e6-14d64103cfa3", "1bff630b-da8c-40a7-8d2d-711586ea6aa2" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "25cfce8a-dda7-4b68-a348-c854ba0b7efe", "d48c2597-0848-4958-9bd5-98779ec80f57" });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "d6c7d5f7-2f41-4830-b74e-7f9cea1013fd", "c965c3aa-7b9c-4911-8157-a81adab22e43" });

            migrationBuilder.DropColumn(
                name: "EmployeeId1",
                table: "CalendarEntries");

            migrationBuilder.AddColumn<string>(
                name: "EmployeeId",
                table: "CalendarEntries",
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.CreateIndex(
                name: "IX_CalendarEntries_EmployeeId",
                table: "CalendarEntries",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_CalendarEntries_AspNetUsers_EmployeeId",
                table: "CalendarEntries",
                column: "EmployeeId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalendarEntries_AspNetUsers_EmployeeId",
                table: "CalendarEntries");

            migrationBuilder.DropIndex(
                name: "IX_CalendarEntries_EmployeeId",
                table: "CalendarEntries");

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

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "CalendarEntries");

            migrationBuilder.AddColumn<string>(
                name: "EmployeeId1",
                table: "CalendarEntries",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1ed2c825-fbd2-4e50-89e6-14d64103cfa3", "1bff630b-da8c-40a7-8d2d-711586ea6aa2", "MasterAdmin", "MASTERADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d6c7d5f7-2f41-4830-b74e-7f9cea1013fd", "c965c3aa-7b9c-4911-8157-a81adab22e43", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "25cfce8a-dda7-4b68-a348-c854ba0b7efe", "d48c2597-0848-4958-9bd5-98779ec80f57", "User", "USER" });

            migrationBuilder.CreateIndex(
                name: "IX_CalendarEntries_EmployeeId1",
                table: "CalendarEntries",
                column: "EmployeeId1");

            migrationBuilder.AddForeignKey(
                name: "FK_CalendarEntries_AspNetUsers_EmployeeId1",
                table: "CalendarEntries",
                column: "EmployeeId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
