using KHost.Common.EntityFramework;
using KHost.Common.Models;

namespace KHost.Common.Repositories.EntityFramework
{
    public class EntityFrameworkDownloadsRepository : InMemoryEntityFrameworkRepository<Download>, IDownloadsRepository
    {
        public EntityFrameworkDownloadsRepository(MemoryContext memoryContext) : base(memoryContext)
        {
        }
    }
}
