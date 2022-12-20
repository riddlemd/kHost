using KHost.Abstractions.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Abstractions.Repositories
{
    public interface IQueuedSongsRepository : IQueueRepository<QueuedSong>
    {
        public Task<IEnumerable<QueuedSong>> FindByQueuedSingerId(int id);
    }
}
