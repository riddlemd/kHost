using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;

namespace KHost.EntityFramework.Repositories
{
    internal class EntityFrameworkDownloadsRepository : BaseEntityFrameworkRepository<Download>, IDownloadsRepository
    {
        public EntityFrameworkDownloadsRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            // Nothing
        }
    }
}
