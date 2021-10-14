using KHost.App.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories.Sql
{
    public class SqlQueuedSongRepository : BaseSqlRepository<QueuedSong>, IQueuedSongsRepository
    {
        public SqlQueuedSongRepository(DbContext context) : base(context)
        {

        }

        DbContext IQueueRepository<QueuedSong>.Context => Context;

        public async Task<IEnumerable<QueuedSong>> GetByQueuedSingerId(int id)
        {
            var queuedSongs = Context.Set<QueuedSong>()
                .Where(qs => qs.QueuedSingerId == id);

            return await queuedSongs.ToListAsync();
        }
    }
}
