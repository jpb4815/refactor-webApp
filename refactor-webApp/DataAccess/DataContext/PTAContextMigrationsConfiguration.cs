using System.Data.Entity.Migrations;

namespace PTWebApp.DataContext
{
    public class PTAContextMigrationsConfiguration: DbMigrationsConfiguration<PTAContext>
    {
        public PTAContextMigrationsConfiguration()
        {
            this.AutomaticMigrationDataLossAllowed = true;
            this.AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(PTAContext context)
        {
            base.Seed(context);

        }
    }
}