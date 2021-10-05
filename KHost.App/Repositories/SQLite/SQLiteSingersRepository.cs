using KHost.App.Models;
using KHost.App.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories.SQLite
{
    public class SQLiteSingersRepository : BaseSQLiteRepository<Singer>, ISingersRepository
    {
        public SQLiteSingersRepository(SQLiteClientProvider sqlClientProvider) : base(sqlClientProvider)
        {
        }
    }
}
