using KHost.App.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace KHost.App.Repositories.Sql
{
    public class SqlQueuedSingerRepository : BaseSqlRepository<QueuedSinger>, IQueuedSingersRepository
    {
        public SqlQueuedSingerRepository(DbContext context) : base(context)
        {
            
        }

        DbContext IQueueRepository<QueuedSinger>.Context => Context;

        protected override IQueryable<QueuedSinger> BuildGetQuery(int? count = null, int? offset = null) => base.BuildGetQuery(count, offset)
            .Include(queuedSinger => queuedSinger.Singer.QueuedSongs)
            .ThenInclude(queuedSong => queuedSong.Song);
    }
}
