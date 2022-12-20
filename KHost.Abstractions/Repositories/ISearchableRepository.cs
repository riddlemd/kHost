using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Abstractions.Repositories
{
    public interface ISearchableRepository<TModel> : ISearchableRepository
        where TModel : class
    {
        public new Task<IEnumerable<TModel>> SearchAsync(string searchQuery, int? count, int? offset);

        #region Non Generic Implementations

        async Task<IEnumerable<object>> ISearchableRepository.SearchAsync(string searchQuery, int? count, int? offset) => await SearchAsync(searchQuery, count, offset);

        #endregion
    }

    public interface ISearchableRepository
    {
        public Task<IEnumerable<object>> SearchAsync(string searchQuery, int? count, int? offset);
    }
}
