using KHost.App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories
{
    public interface IRepository<TModel>
        where TModel : BaseModel
    {
        public Task<IEnumerable<TModel>> Get(int count = 20, int offset = 0);

        public Task<(bool, int?)> Save(TModel model);

        public Task<IEnumerable<TModel>> Search(string query, int count = 20, int offset = 0);

        public Task<TModel> GetById(int id);

        public Task<bool> Remove(int id);
    }
}
