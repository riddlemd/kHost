using KHost.Common.EntityFramework;
using KHost.Common.Models;

namespace KHost.Common.Repositories.EntityFramework
{
    public class EntityFrameworkDownloadsRepository : BaseEntityFrameworkRepository<Download>, IDownloadsRepository
    {
        public EntityFrameworkDownloadsRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
