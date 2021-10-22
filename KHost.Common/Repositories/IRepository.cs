using KHost.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public interface IRepository<TModel> : IRepository
        where TModel : class, IModelWithId
    {
        public new Task<TModel> FindById(int id);

        public new Task<IEnumerable<TModel>> FindByIds(IEnumerable<int> ids);

        public Task Create(TModel entity);

        public new Task<IEnumerable<TModel>> Read(int? count = null, int? offset = null);

        public Task Update(TModel entity);

        public Task Delete(TModel entity);

        #region Non Generic Implementations

        async Task<object> IRepository.FindById(int id) => await FindById(id);

        async Task<IEnumerable<object>> IRepository.FindByIds(IEnumerable<int> ids) => await FindByIds(ids);

        Task IRepository.Create(object entity) => Create(entity as TModel);

        async Task<IEnumerable<object>> IRepository.Read(int? count, int? offset) => await Read(count, offset);

        Task IRepository.Update(object entity) => Update(entity as TModel);

        Task IRepository.Delete(object entity) => Delete(entity as TModel);

        #endregion
    }

    public interface IRepository
    {
        public Task<IEnumerable<object>> Read(int? count = null, int? offset = null);

        public Task<object> FindById(int id);

        public Task<IEnumerable<object>> FindByIds(IEnumerable<int> ids);

        public Task Create(object entity);

        public Task Update(object entity);

        public Task DeleteById(int id);

        public Task Delete(object entity);


        public Task<int> Save();
    }
}
