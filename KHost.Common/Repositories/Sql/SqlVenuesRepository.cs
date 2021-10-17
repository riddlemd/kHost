using KHost.Common.Models;

namespace KHost.Common.Repositories.Sql
{
    public class SqlVenuesRepository : BaseSqlRepository<Venue>, IVenuesRepository
    {
        public SqlVenuesRepository(KHostDbContext context) : base(context)
        {

        }
    }
}
