using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public interface IQueueRepository<TModel> : IRepository<TModel>
        where TModel : class, IModelWithId, IModelWithPosition
    {
        private static float PositionIncrement { get; } = 0.0001f; 

        abstract protected DbContext Context { get; }

        public async Task<float> MoveUp(int id)
        {
            var entity = await FindById(id);

            var prevEntity = await GetPrevEntity(entity);

            if (prevEntity == null) return entity.Position;

            entity.Position = prevEntity.Position - PositionIncrement;

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<float> MoveDown(int id)
        {
            var entity = await FindById(id);

            var nextEntity = await GetNextEntity(entity);

            if (nextEntity == null) return entity.Position;

            entity.Position = nextEntity.Position + PositionIncrement;

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<float> MoveToTop(int id)
        {
            var entity = await FindById(id);

            var firstEntity = await GetFirstEntity();

            if (firstEntity == entity) return entity.Position;

            entity.Position = firstEntity.Position - PositionIncrement;

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<float> MoveToBottom(int id)
        {
            var entity = await FindById(id);

            var lastEntity = await GetLastEntity();

            if (lastEntity == entity) return entity.Position;

            entity.Position = lastEntity.Position + PositionIncrement;

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        public async Task<float> MoveBefore(int beforeId, int id)
        {
            var entity = await FindById(id);

            var beforeEntity = await FindById(beforeId);

            if (beforeEntity == entity) return entity.Position;

            entity.Position = beforeEntity.Position - PositionIncrement;

            await Context.SaveChangesAsync();

            return entity.Position;
        }

        private async Task<TModel> GetFirstEntity() => await Context.Set<TModel>()
            .OrderBy(e => e.Position)
            .FirstOrDefaultAsync();

        private async Task<TModel> GetLastEntity() => await Context.Set<TModel>()
            .OrderByDescending(e => e.Position)
            .FirstOrDefaultAsync();

        private async Task<TModel> GetPrevEntity(TModel entity) => await Context.Set<TModel>()
            .Where(e => e.Position < entity.Position)
            .OrderByDescending(e => e.Position)
            .FirstOrDefaultAsync();

        private async Task<TModel> GetNextEntity(TModel entity) => await Context.Set<TModel>()
            .Where(e => e.Position > entity.Position)
            .OrderBy(e => e.Position)
            .FirstOrDefaultAsync();
    }
}
