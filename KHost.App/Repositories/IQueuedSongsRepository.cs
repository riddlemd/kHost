using KHost.App.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.App.Repositories
{
    public interface IQueuedSongsRepository : IQueueRepository<QueuedSong>
    {
        public Task<IEnumerable<QueuedSong>> GetByQueuedSingerId(int id);
    }
}
