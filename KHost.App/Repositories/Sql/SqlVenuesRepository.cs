using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace KHost.App.Repositories.Sql
{
    public class SqlVenuesRepository : BaseSqlRepository<Venue>, IVenuesRepository
    {
        public SqlVenuesRepository(DbContext context) : base(context)
        {

        }
    }
}
