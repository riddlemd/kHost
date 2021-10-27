using KHost.Common.EntityFramework;
using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EntityFramework
{
    public class EntityFrameworkQueuedSongRepository : BaseEntityFrameworkRepository<QueuedSong>, IQueuedSongsRepository
    {
        public EntityFrameworkQueuedSongRepository(DatabaseContext context) : base(context)
        {

        }

        DbContext IQueueRepository<QueuedSong>.Context => Context;

        public async Task<QueuedSong?> GetLast(int queuedSingerId) => await Context.Set<QueuedSong>().Where(e => e.QueuedSingerId == queuedSingerId).OrderBy(e => e.Position).LastOrDefaultAsync();

        public async Task<IEnumerable<QueuedSong>> FindByQueuedSingerId(int id)
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

        public async override Task Create(QueuedSong entity)
        {
            var lastQueuedSong = await GetLast(entity.QueuedSingerId);

            entity.Position = (lastQueuedSong?.Position ?? -1) + 1;

            await base.Create(entity);
        }
    }
}
