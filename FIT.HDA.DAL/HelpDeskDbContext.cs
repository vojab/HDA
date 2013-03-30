using System.Data.Entity;
using FIT.HDA.Models;

namespace FIT.HDA.DAL
{
    public class HelpDeskDbContext : DbContext
    {
        public HelpDeskDbContext() { }

        public HelpDeskDbContext(string connString) : base(connString) { }

        public DbSet<Request> Requests { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<TimeManagament> TimeManagaments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Do not crete database automatically
            Database.SetInitializer<HelpDeskDbContext>(null);

            base.OnModelCreating(modelBuilder);
        }
    }
}
