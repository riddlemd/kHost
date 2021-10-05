using Dapper.Contrib.Extensions;
using KHost.App.Models;
using KHost.App.Providers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KHost.Common.Collections;

namespace KHost.App.Repositories.SQLite
{
    public class SQLiteQueuedSongRepository : BaseSQLiteRepository<QueuedSong>, IQueuedSongsRepository
    {
        public SQLiteQueuedSongRepository(SQLiteClientProvider sqlClientProvider) : base(sqlClientProvider)
        {
        }

        SQLiteClientProvider IQueueRepository<QueuedSong>.SqlClientProvider => SqlClientProvider;
    }
}
