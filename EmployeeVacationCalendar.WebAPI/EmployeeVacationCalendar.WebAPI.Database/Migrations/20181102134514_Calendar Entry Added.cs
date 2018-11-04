using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeVacationCalendar.WebAPI.Database.Migrations
{
    public partial class CalendarEntryAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "CalendarEntries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    VacationType = table.Column<int>(nullable: false),
                    EmployeeId1 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalendarEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CalendarEntries_AspNetUsers_EmployeeId1",
                        column: x => x.EmployeeId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CalendarEntries");

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
    }
}
