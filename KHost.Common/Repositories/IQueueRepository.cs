using KHost.Common.Collections;
using KHost.Common.ErrorHandling;
using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public interface IQueueRepository<TModel> : IRepository<TModel>
        where TModel : class, IModelWithId, IModelWithPosition
    {
        abstract protected DbContext Context { get; }

        public async Task<int> MoveUp(int id)
        {
            var entities = await GetEntities();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            _ = entity ?? throw new KHostException("Entity not found");

            var entityKey = entities.IndexOf(entity);

            entities.MoveTowardsFirst(entityKey);

            ReclaculatePositions(entities);

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<int> MoveDown(int id)
        {
            var entities = await GetEntities();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            _ = entity ?? throw new KHostException("Entity not found");

            var entityKey = entities.IndexOf(entity);

            entities.MoveTowardsLast(entityKey);

            ReclaculatePositions(entities);

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<int> MoveToTop(int id)
        {
            var entities = await GetEntities();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            _ = entity ?? throw new KHostException("Entity not found");

            var entityKey = entities.IndexOf(entity);

            entities.MoveToFirst(entityKey);

            ReclaculatePositions(entities);

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<int> MoveToBottom(int id)
        {
            var entities = await GetEntities();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            _ = entity ?? throw new KHostException("Entity not found");

            var entityKey = entities.IndexOf(entity);

            entities.MoveToLast(entityKey);

            ReclaculatePositions(entities);

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<int> MoveTo(int id, int position)
        {
            var entities = await GetEntities();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            _ = entity ?? throw new KHostException("Entity not found");

            if (entity.Position == position) return entity.Position;

            var entityKey = entities.IndexOf(entity);

            entities.Move(entityKey, position);

            ReclaculatePositions(entities);

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<TModel?> GetFirst() => await Context.Set<TModel>().OrderBy(e => e.Position).FirstOrDefaultAsync();

        public async Task<TModel?> GetLast() => await Context.Set<TModel>().OrderBy(e => e.Position).LastOrDefaultAsync();

        private async Task<List<TModel>> GetEntities() => await Context.Set<TModel>()
            .OrderBy(e => e.Position)
            .ToListAsync();

        private void ReclaculatePositions(List<TModel> entities)
        {
            var i = 0;
            foreach(var entity in entities)
            {
                entity.Position = i++;
            }
        }
    }
}
