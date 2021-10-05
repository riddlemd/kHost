using KHost.App.Models;
using KHost.App.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories.SQLite
{
    public class SQLiteQueuedSingerRepository : BaseSQLiteRepository<QueuedSinger>, IQueuedSingersRepository
    {
        public SQLiteQueuedSingerRepository(SQLiteClientProvider sqlClientProvider) : base(sqlClientProvider)
        {
        }

        SQLiteClientProvider IQueueRepository<QueuedSinger>.SqlClientProvider => SqlClientProvider;
    }
}
