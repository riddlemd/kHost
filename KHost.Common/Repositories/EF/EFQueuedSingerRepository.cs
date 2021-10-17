using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EF
{
    public class EFQueuedSingerRepository : BaseEFRepository<QueuedSinger>, IQueuedSingersRepository
    {
        public EFQueuedSingerRepository(DatabaseContext context) : base(context)
        {
            
        }

        DbContext IQueueRepository<QueuedSinger>.Context => Context;

        public override async Task<IEnumerable<QueuedSinger>> Read(int? count = null, int? offset = null)
        {
            var query = BuildReadQuery(count, offset)
                .OrderBy(qs => qs.Position);

            var queuedSingers = await query.ToArrayAsync();

            foreach(var queuedSinger in queuedSingers)
            {
                var queuedSongsCount = Context.Set<QueuedSong>()
                    .Where(qs => qs.QueuedSingerId == queuedSinger.Id)
                    .Count();

                queuedSinger.QueuedSongsCount = queuedSongsCount;
            }

            return queuedSingers;
        }
    }
}
