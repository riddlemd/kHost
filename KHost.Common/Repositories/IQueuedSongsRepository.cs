using KHost.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public interface IQueuedSongsRepository : IQueueRepository<QueuedSong>
    {
        public Task<IEnumerable<QueuedSong>> FindByQueuedSingerId(int id);
    }
}
