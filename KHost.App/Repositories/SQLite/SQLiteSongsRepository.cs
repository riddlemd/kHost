using KHost.App.Models;
using KHost.App.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories.SQLite
{
    public class SQLiteSongsRepository : BaseSQLiteRepository<Song>, ISongRepository
    {
        public SQLiteSongsRepository(SQLiteClientProvider sqlClientProvider) : base(sqlClientProvider)
        {
        }
    }
}
