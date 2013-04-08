namespace FIT.HDA.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Requests",
                c => new
                    {
                        RequestId = c.Int(nullable: false, identity: true),
                        RequestDescription = c.String(),
                        RequestReadyForArchive = c.Boolean(nullable: false),
                        RequestOpenDate = c.DateTime(nullable: false),
                        RequestClosedDate = c.DateTime(nullable: false),
                        TimeManagamentId = c.Int(),
                        DateCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.RequestId)
                .ForeignKey("dbo.TimeManagaments", t => t.TimeManagamentId)
                .Index(t => t.TimeManagamentId);
            
            CreateTable(
                "dbo.TimeManagaments",
                c => new
                    {
                        TimeManagamentId = c.Int(nullable: false, identity: true),
                        EstimationTimeInHours = c.Int(nullable: false),
                        RecordTimeInHours = c.Int(nullable: false),
                        DateCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.TimeManagamentId);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        ProductId = c.Int(nullable: false),
                        ProductName = c.String(),
                        ProductDescription = c.String(),
                        RequestId = c.Int(),
                        DateCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ProductId)
                .ForeignKey("dbo.Requests", t => t.ProductId)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.RequestStatus",
                c => new
                    {
                        RequestStatusId = c.Int(nullable: false, identity: true),
                        RequestStatusValue = c.Int(nullable: false),
                        RequestStatusName = c.String(),
                        DateCreated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.RequestStatusId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Products", new[] { "ProductId" });
            DropIndex("dbo.Requests", new[] { "TimeManagamentId" });
            DropForeignKey("dbo.Products", "ProductId", "dbo.Requests");
            DropForeignKey("dbo.Requests", "TimeManagamentId", "dbo.TimeManagaments");
            DropTable("dbo.RequestStatus");
            DropTable("dbo.Products");
            DropTable("dbo.TimeManagaments");
            DropTable("dbo.Requests");
        }
    }
}
