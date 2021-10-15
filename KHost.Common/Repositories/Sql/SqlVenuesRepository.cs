using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace KHost.Common.Repositories.Sql
{
    public class SqlVenuesRepository : BaseSqlRepository<Venue>, IVenuesRepository
    {
        public SqlVenuesRepository(DbContext context) : base(context)
        {

        }
    }
}
