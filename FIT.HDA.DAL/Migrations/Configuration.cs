using FIT.HDA.Models;

namespace FIT.HDA.DAL.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<HelpDeskDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(HelpDeskDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //var req1 = new Request() {DateCreated = DateTime.UtcNow};
            //var req2 = new Request() {DateCreated = DateTime.UtcNow};

            //var timem = new TimeManagament() {DateCreated = DateTime.UtcNow};

            //req1.TimeManagament = timem;

            //context.Requests.AddOrUpdate(request => request.RequestDescription, req1, req2);


            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
