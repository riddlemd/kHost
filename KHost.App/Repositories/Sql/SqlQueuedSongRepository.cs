using KHost.App.Models;
using Microsoft.EntityFrameworkCore;

namespace KHost.App.Repositories.Sql
{
    public class SqlQueuedSongRepository : BaseSqlRepository<QueuedSong>, IQueuedSongsRepository
    {
        public SqlQueuedSongRepository(DbContext context) : base(context)
        {

        }

        DbContext IQueueRepository<QueuedSong>.Context => Context;
    }
}
