using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories
{
    public interface ISearchableRepository<TModel> : ISearchableRepository
        where TModel : class
    {
        public new Task<IEnumerable<TModel>> Search(string searchQuery, int? count, int? offset);

        #region Non Generic Implementations

        async Task<IEnumerable<object>> ISearchableRepository.Search(string searchQuery, int? count, int? offset) => await Search(searchQuery, count, offset);

        #endregion
    }

    public interface ISearchableRepository
    {
        public Task<IEnumerable<object>> Search(string searchQuery, int? count, int? offset);
    }
}
