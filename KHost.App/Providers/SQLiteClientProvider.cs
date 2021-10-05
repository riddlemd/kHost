using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SQLite;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Providers
{
    public class SQLiteClientProvider : IDisposable
    {
        private string ConnectionString { get; }

        private IDbConnection _connection;
        public IDbConnection Connection
        {
            get
            {
                if (_connection == null)
                    _connection = new SQLiteConnection(ConnectionString); ;

                return _connection;
            }
        }

        public SQLiteClientProvider(IConfiguration configuration, string ConnectionStringName = "DefaultConnection")
        {
            ConnectionString = configuration.GetConnectionString(ConnectionStringName);
        }

        public void Dispose()
        {
            if (Connection != null)
                Connection.Dispose();
        }
    }
}
