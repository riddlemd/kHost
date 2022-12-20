using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;

namespace KHost.EntityFramework.Repositories
{
    public class EntityFrameworkDownloadsRepository : BaseEntityFrameworkRepository<Download>, IDownloadsRepository
    {
        public EntityFrameworkDownloadsRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            // Nothing
        }
    }
}
