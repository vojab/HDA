using System.Data.Entity;
using FIT.HDA.DAL.Migrations;
using FIT.HDA.Models;

namespace FIT.HDA.DAL
{
    public class HelpDeskDbContext : DbContext
    {
        public HelpDeskDbContext()
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<HelpDeskDbContext>());

        }

        //public HelpDeskDbContext(string connString) : base(connString)
        //{
        //    //Database.SetInitializer(new DropCreateDatabaseIfModelChanges<HelpDeskDbContext>()); 
        //}

        public DbSet<Request> Requests { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<TimeManagament> TimeManagaments { get; set; }
        public DbSet<RequestStatus> RequestStatuses { get; set; }
        public DbSet<Attachment> Attachments { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    // Do not crete database automatically
        //    //Database.SetInitializer<HelpDeskDbContext>()

        //    base.OnModelCreating(modelBuilder);
        //}
    }
}
