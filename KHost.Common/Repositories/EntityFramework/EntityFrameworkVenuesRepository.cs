using KHost.Common.EntityFramework;
using KHost.Common.Models;

namespace KHost.Common.Repositories.EntityFramework
{
    public class EntityFrameworkVenuesRepository : BaseEntityFrameworkRepository<Venue>, IVenuesRepository
    {
        public EntityFrameworkVenuesRepository(DatabaseContext context) : base(context)
        {

        }
    }
}
