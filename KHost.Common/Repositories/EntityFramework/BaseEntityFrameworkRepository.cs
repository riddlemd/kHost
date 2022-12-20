using KHost.Common.EntityFramework;
using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EntityFramework
{
    public abstract class BaseEntityFrameworkRepository<TModel> : IRepository<TModel>, IRepositoryWithContext
        where TModel : class, IModelWithId
    {
        protected virtual BaseContext Context { get; }

        IRepositoryContext IRepositoryWithContext.Context => Context as IRepositoryContext;

        protected BaseEntityFrameworkRepository(BaseContext context)
        {
            Context = context;
        }

        public virtual async Task<IEnumerable<TModel>> Read(int? count = null, int? offset = null) => await BuildReadQuery(count, offset).ToArrayAsync();

        public virtual async Task<TModel?> FindById(int id) => (await BuildFindByIdQuery(id).ToArrayAsync()).FirstOrDefault();

        public virtual async Task<IEnumerable<TModel>> FindByIds(IEnumerable<int> ids) => await BuildFindByIdsQuery(ids).ToArrayAsync();

        public virtual Task Create(TModel entity)
        {
            if (entity.Id != null) throw new Exception("Entity Id must be null to be inserted");

            Context.Set<TModel>().Add(entity);

            return Task.CompletedTask;
        }

        public virtual Task Delete(TModel entity)
        {
            Context.Set<TModel>().Remove(entity);

            return Task.CompletedTask;
        }

        public virtual async Task DeleteById(int id)
        {
            var entity = await FindById(id);

            if (entity == null) return;

            await Delete(entity);
        }

        public virtual async Task Update(TModel entity)
        {
            if (entity.Id == null) throw new Exception("Entity must have valid Id to be updated");

            var originalEntity = await FindById((int)entity.Id);

            if (originalEntity == null) throw new Exception($"Entity with Id (${entity.Id}) could not be found to update.");

            Context.Entry(originalEntity).CurrentValues.SetValues(entity);
        }

        public virtual Task<int> Save() => Context.SaveChangesAsync();

        #region Query Building Methods

        protected virtual IQueryable<TModel> BuildReadQuery(int? count = null, int? offset = null)
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
