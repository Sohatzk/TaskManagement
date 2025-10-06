using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskManagement.Storage.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkItemNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WorkItemNumber",
                table: "WorkItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkItemNumber",
                table: "WorkItems");
        }
    }
}
