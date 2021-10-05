using Dapper;
using Dapper.Contrib.Extensions;
using KHost.App.Models;
using KHost.App.Providers;
using KHost.Common.Text;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.App.Repositories.SQLite
{
    public abstract class BaseSQLiteRepository<TModel> : IRepository<TModel>
        where TModel : BaseModel
    {
        protected SQLiteClientProvider SqlClientProvider { get; }

        protected string TableName { get; }

        protected BaseSQLiteRepository(SQLiteClientProvider sqlClientProvider)
        {
            SqlClientProvider = sqlClientProvider;
            TableName = typeof(TModel).Name.Pluralize();
        }

        public virtual async Task<IEnumerable<TModel>> GetAll()
        {
            var connection = SqlClientProvider.Connection;
            return await connection.GetAllAsync<TModel>();
        }

        public virtual async Task<(bool, int?)> Save(TModel model)
        {
            var connection = SqlClientProvider.Connection;

            if (model.Id > 0)
                return (await connection.UpdateAsync(model), model.Id);

            return (true, await connection.InsertAsync(model));
        }

        public virtual async Task<IEnumerable<TModel>> Search(string query)
        {
            var connection = SqlClientProvider.Connection;

            var sql = $"SELECT * FROM {TableName} WHERE name LIKE @Query";
            
            var parameters = new {
                Query = query.Replace("*", "%")
            };

            return await connection.QueryAsync<TModel>(sql, parameters);
        }

        public virtual async Task<bool> Remove(int id)
        {
            var model = GetById(id);
            var connection = SqlClientProvider.Connection;
            return await connection.DeleteAsync(model);
        }

        public virtual async Task<TModel> GetById(int id)
        {
            var connection = SqlClientProvider.Connection;
            return await connection.GetAsync<TModel>(id);
        }
    }
}
