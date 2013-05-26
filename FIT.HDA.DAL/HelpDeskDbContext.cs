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
        public DbSet<RequestStatus> RequestStatus { get; set; }
        public DbSet<RequestStatusChanges> RequestStatusChanges { get; set; }
        public DbSet<AssignedUserChanges> AssignedUserChanges { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserType> UserTypes { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    // Do not crete database automatically
        //    //Database.SetInitializer<HelpDeskDbContext>()

        //    base.OnModelCreating(modelBuilder);
        //}
    }
}
