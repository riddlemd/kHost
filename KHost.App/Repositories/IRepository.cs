using KHost.App.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.App.Repositories
{
    public interface IRepository<TModel> : IRepository
        where TModel : class, IModelWithId
    {
        public new Task<IEnumerable<TModel>> Get(int? count = null, int? offset = null);

        public new Task<TModel> GetById(int id);

        public new Task<IEnumerable<TModel>> GetByIds(IEnumerable<int> ids);

        public Task Insert(TModel entity);

        public Task Delete(TModel entity);

        public Task Update(TModel entity);

        #region Non Generic Implementations

        async Task<IEnumerable<object>> IRepository.Get(int? count, int? offset) => await Get(count, offset);

        async Task<object> IRepository.GetById(int id) => await GetById(id);

        async Task<IEnumerable<object>> IRepository.GetByIds(IEnumerable<int> ids) => await GetByIds(ids);

        Task IRepository.Insert(object entity) => Insert(entity as TModel);

        Task IRepository.Delete(object entity) => Delete(entity as TModel);

        Task IRepository.Update(object entity) => Update(entity as TModel);

        #endregion
    }

    public interface IRepository
    {
        public Task<IEnumerable<object>> Get(int? count = null, int? offset = null);

        public Task<object> GetById(int id);

        public Task<IEnumerable<object>> GetByIds(IEnumerable<int> ids);

        public Task Insert(object entity);

        public Task DeleteById(int id);

        public Task Delete(object entity);

        public Task Update(object entity);

        public Task<int> Save();
    }
}
