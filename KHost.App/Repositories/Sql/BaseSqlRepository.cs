using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories.Sql
{
    public abstract class BaseSqlRepository<TModel> : IRepository<TModel>
        where TModel : class, IModelWithId
    {
        protected virtual DbContext Context { get; }

        protected BaseSqlRepository(DbContext context)
        {
            Context = context;
        }

        public virtual async Task<IEnumerable<TModel>> Read(int? count = null, int? offset = null) => await BuildReadQuery(count, offset).ToArrayAsync();

        public virtual async Task<TModel> GetById(int id) => (await BuildGetByIdQuery(id).ToArrayAsync()).FirstOrDefault();

        public virtual async Task<IEnumerable<TModel>> GetByIds(IEnumerable<int> ids) => await BuildGetByIdsQuery(ids).ToArrayAsync();

        public virtual async Task Create(TModel entity)
        {
            if (entity.Id != null) throw new Exception("Entity Id must be null to be inserted");

            Context.Set<TModel>().Add(entity);
        }

        public virtual async Task Delete(TModel entity) => Context.Set<TModel>().Remove(entity);

        public virtual async Task DeleteById(int id)
        {
            var entity = await GetById(id);

            await Delete(entity);
        }

        public virtual async Task Update(TModel entity)
        {
            if (entity.Id == null) throw new Exception("Entity must have valid Id to be updated");

            var originalEntity = await GetById((int)entity.Id);

            if (originalEntity == null) throw new Exception($"Entity with Id (${entity.Id}) could not be found to update.");

            Context.Entry(originalEntity).CurrentValues.SetValues(entity);
        }

        public virtual Task<int> Save() => Context.SaveChangesAsync();

        //

        protected virtual IQueryable<TModel> BuildReadQuery(int? count = null, int? offset = null)
        {
            var query = Context.Set<TModel>().AsQueryable();

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            return query;
        }

        protected virtual IQueryable<TModel> BuildGetByIdQuery(int id)
        {
            var query = Context.Set<TModel>().AsQueryable()
                .Where(e => e.Id == id);

            return query;
        }

        protected virtual IQueryable<TModel> BuildGetByIdsQuery(IEnumerable<int> ids)
        {
            var query = Context.Set<TModel>().AsQueryable()
                .Where(e => e.Id != null && ids.Contains((int)e.Id));

            return query;
        }
    }
}
