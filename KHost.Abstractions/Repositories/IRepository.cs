using KHost.Abstractions.ErrorHandling;
using KHost.Abstractions.Models;

namespace KHost.Abstractions.Repositories
{
    public interface IRepository<TModel> : IRepository
        where TModel : class, IModelWithId
    {
        public new Task<TModel?> FindByIdAsync(int id);

        public new Task<IEnumerable<TModel>> FindByIdsAsync(IEnumerable<int> ids);

        public Task CreateAsync(TModel entity);

        public new Task<IEnumerable<TModel>> FetchAsync(int? count = null, int? offset = null);

        public Task UpdateAsync(TModel entity);

        public Task DeleteAsync(TModel entity);

        #region Non Generic Implementations

        async Task<object?> IRepository.FindByIdAsync(int id) => await FindByIdAsync(id);

        async Task<IEnumerable<object>> IRepository.FindByIdsAsync(IEnumerable<int> ids) => await FindByIdsAsync(ids);

        Task IRepository.CreateAsync(object entity) => CreateAsync(entity as TModel ?? throw new KHostException("Invalid cast"));

        async Task<IEnumerable<object>> IRepository.FetchAsync(int? count, int? offset) => await FetchAsync(count, offset);

        Task IRepository.UpdateAsync(object entity) => UpdateAsync(entity as TModel ?? throw new KHostException("Invalid cast"));

        Task IRepository.DeleteAsync(object entity) => DeleteAsync(entity as TModel ?? throw new KHostException("Invalid cast"));

        #endregion
    }

    public interface IRepository
    {
        public Task<object?> FindByIdAsync(int id);

        public Task<IEnumerable<object>> FindByIdsAsync(IEnumerable<int> ids);

        public Task CreateAsync(object entity);

        public Task<IEnumerable<object>> FetchAsync(int? count = null, int? offset = null);

        public Task UpdateAsync(object entity);

        public Task DeleteByIdAsync(int id);

        public Task DeleteAsync(object entity);

        public Task<int> SaveAsync();
    }
}
