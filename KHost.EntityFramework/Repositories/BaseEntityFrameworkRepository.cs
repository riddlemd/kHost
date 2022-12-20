using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework.Repositories
{
    internal abstract class BaseEntityFrameworkRepository<TModel> : IRepository<TModel>, IRepositoryWithContext
        where TModel : class, IModelWithId
    {
        protected virtual DatabaseContext Context { get; }

        IRepositoryContext IRepositoryWithContext.Context => Context;

        protected BaseEntityFrameworkRepository(DatabaseContext context)
        {
            Context = context;
        }

        public virtual async Task<IEnumerable<TModel>> FetchAsync(int? count = null, int? offset = null) => await BuildFetchQuery(count, offset).ToArrayAsync();

        public virtual async Task<TModel?> FindByIdAsync(int id) => (await BuildFindByIdQuery(id).ToArrayAsync()).FirstOrDefault();

        public virtual async Task<IEnumerable<TModel>> FindByIdsAsync(IEnumerable<int> ids) => await BuildFindByIdsQuery(ids).ToArrayAsync();

        public virtual Task CreateAsync(TModel entity)
        {
            if (entity.Id != null) throw new Exception("Entity Id must be null to be inserted");

            Context.Set<TModel>().Add(entity);

            return Task.CompletedTask;
        }

        public virtual Task DeleteAsync(TModel entity)
        {
            Context.Set<TModel>().Remove(entity);

            return Task.CompletedTask;
        }

        public virtual async Task DeleteByIdAsync(int id)
        {
            var entity = await FindByIdAsync(id);

            if (entity == null) return;

            await DeleteAsync(entity);
        }

        public virtual async Task UpdateAsync(TModel entity)
        {
            if (entity.Id == null) throw new Exception("Entity must have valid Id to be updated");

            var originalEntity = await FindByIdAsync((int)entity.Id);

            if (originalEntity == null) throw new Exception($"Entity with Id (${entity.Id}) could not be found to update.");

            Context.Entry(originalEntity).CurrentValues.SetValues(entity);
        }

        public virtual Task<int> SaveAsync() => Context.SaveChangesAsync();

        #region Query Building Methods

        protected virtual IQueryable<TModel> BuildFetchQuery(int? count = null, int? offset = null)
        {
            var query = Context.Set<TModel>().AsQueryable();

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            if (typeof(TModel).IsAssignableTo(typeof(IModelWithName)))
                query = query.OrderBy(e => ((IModelWithName)e).Name);

            return query;
        }

        protected virtual IQueryable<TModel> BuildFindByIdQuery(int id)
        {
            var query = Context.Set<TModel>().AsQueryable()
                .Where(e => e.Id == id);

            return query;
        }

        protected virtual IQueryable<TModel> BuildFindByIdsQuery(IEnumerable<int> ids)
        {
            var query = Context.Set<TModel>().AsQueryable()
                .Where(e => e.Id != null && ids.Contains((int)e.Id));

            return query;
        }

        #endregion
    }
}
