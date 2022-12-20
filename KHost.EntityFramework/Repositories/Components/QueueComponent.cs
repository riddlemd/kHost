using KHost.Abstractions.ErrorHandling;
using KHost.Abstractions.Models;
using KHost.Common.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework.Repositories.Components
{
    internal class QueueComponent<TModel>
        where TModel : class, IModelWithId, IModelWithPosition
    {
        private readonly DbContext _context;

        public QueueComponent(DbContext context)
        {
            _context = context;
        }

        public async Task<int> MoveUpAsync(int id)
        {
            var entities = await FetchAllAsync();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            if(entity is null)
                throw new KHostException("Entity not found");

            var entityKey = entities.IndexOf(entity);

            entities.MoveTowardsFirst(entityKey);

            ReclaculatePositions(entities);

            await _context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<int> MoveDownAsync(int id)
        {
            var entities = await FetchAllAsync();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            if (entity is null)
                throw new KHostException("Entity not found");

            var entityKey = entities.IndexOf(entity);

            entities.MoveTowardsLast(entityKey);

            ReclaculatePositions(entities);

            await _context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<int> MoveToTopAsync(int id)
        {
            var entities = await FetchAllAsync();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            if (entity is null)
                throw new KHostException("Entity not found");

            var entityKey = entities.IndexOf(entity);

            entities.MoveToFirst(entityKey);

            ReclaculatePositions(entities);

            await _context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<int> MoveToBottomAsync(int id)
        {
            var entities = await FetchAllAsync();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            if (entity is null)
                throw new KHostException("Entity not found");

            var entityKey = entities.IndexOf(entity);

            entities.MoveToLast(entityKey);

            ReclaculatePositions(entities);

            await _context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<int> MoveToAsync(int id, int position)
        {
            var entities = await FetchAllAsync();

            var entity = entities.FirstOrDefault(e => e.Id == id);

            if (entity is null)
                throw new KHostException("Entity not found");

            if (entity.Position == position) return entity.Position;

            var entityKey = entities.IndexOf(entity);

            entities.Move(entityKey, position);

            ReclaculatePositions(entities);

            await _context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<TModel?> GetFirstAsync()
            => await _context.Set<TModel>()
            .OrderBy(e => e.Position)
            .FirstOrDefaultAsync();

        public async Task<TModel?> GetLastAsync()
            => await _context.Set<TModel>()
            .OrderBy(e => e.Position)
            .LastOrDefaultAsync();

        public async Task<List<TModel>> FetchAllAsync()
            => await _context.Set<TModel>()
            .OrderBy(e => e.Position)
            .ToListAsync();

        private void ReclaculatePositions(List<TModel> entities)
        {
            var i = 0;
            foreach (var entity in entities)
            {
                entity.Position = i++;
            }
        }
    }
}
