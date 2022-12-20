using KHost.Abstractions.ErrorHandling;
using KHost.Abstractions.Models;

namespace KHost.Abstractions.Repositories
{
    public interface IRepository<TModel> : IRepository
        where TModel : class, IModelWithId
    {
        public new Task<TModel?> FindById(int id);

        public new Task<IEnumerable<TModel>> FindByIds(IEnumerable<int> ids);

        public Task Create(TModel entity);

        public new Task<IEnumerable<TModel>> Fetch(int? count = null, int? offset = null);

        public Task Update(TModel entity);

        public Task Delete(TModel entity);

        #region Non Generic Implementations

        async Task<object?> IRepository.FindById(int id) => await FindById(id);

        async Task<IEnumerable<object>> IRepository.FindByIds(IEnumerable<int> ids) => await FindByIds(ids);

        Task IRepository.Create(object entity) => Create(entity as TModel ?? throw new KHostException("Invalid cast"));

        async Task<IEnumerable<object>> IRepository.Fetch(int? count, int? offset) => await Fetch(count, offset);

        Task IRepository.Update(object entity) => Update(entity as TModel ?? throw new KHostException("Invalid cast"));

        Task IRepository.Delete(object entity) => Delete(entity as TModel ?? throw new KHostException("Invalid cast"));

        #endregion
    }

    public interface IRepository
    {
        public Task<object?> FindById(int id);

        public Task<IEnumerable<object>> FindByIds(IEnumerable<int> ids);

        public Task Create(object entity);

        public Task<IEnumerable<object>> Fetch(int? count = null, int? offset = null);

        public Task Update(object entity);

        public Task DeleteById(int id);

        public Task Delete(object entity);

        public Task<int> Save();
    }
}
