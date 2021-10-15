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
                .Where(qs => qs.QueuedSingerId == id)
                .OrderBy(qs => qs.Position);

            return await queuedSongs.ToListAsync();
        }

        protected override IQueryable<QueuedSong> BuildReadQuery(int? count = null, int? offset = null)
        {
            var query = base.BuildReadQuery(count, offset)
                .OrderBy(qs => qs.Position);


            return query;
        }
    }
}
