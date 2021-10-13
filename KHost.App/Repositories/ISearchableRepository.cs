using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories
{
    public interface ISearchableRepository<TModel>
        where TModel : class
    {
        public Task<IEnumerable<TModel>> Search(string searchQuery, int? count, int? offset);
    }
}
