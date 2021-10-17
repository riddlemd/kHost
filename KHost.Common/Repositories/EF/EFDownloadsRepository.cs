using KHost.Common.Models;

namespace KHost.Common.Repositories.EF
{
    public class EFDownloadsRepository : InMemoryEFRepository<Download>, IDownloadsRepository
    {
        public EFDownloadsRepository(MemoryContext memoryContext) : base(memoryContext)
        {
        }
    }
}
