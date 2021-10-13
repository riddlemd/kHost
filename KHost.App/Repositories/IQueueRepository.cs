using KHost.App.Models;
using KHost.Common.Collections;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories
{
    public interface IQueueRepository<TModel> : IRepository<TModel>
        where TModel : class, IModelWithId, IModelWithPosition
    {
        abstract protected DbContext Context { get; }

        protected void RecalculatePositions(List<TModel> models)
        {
            var i = 0;
            models.ForEach(qs => qs.Position = i++);
        }

        protected async Task<List<TModel>> GetInOrder() => await Context.Set<TModel>().OrderBy(e => e.Position).ToListAsync();

        public virtual async Task<int> MoveUp(int id)
        {
            var entity = await GetById(id);

            var entities = await GetInOrder();

            var index = entity.Position - 1;

            entities.Move(index, index - 1);

            RecalculatePositions(entities);

            await Save();

            return entity.Position;
        }

        public virtual async Task<int> MoveDown(int id)
        {
            var entity = await GetById(id);

            var entities = await GetInOrder();

            var index = entity.Position - 1;

            entities.Move(index, index + 1);

            RecalculatePositions(entities);

            await Save();

            return entity.Position;
        }

        public virtual async Task<int> MoveToTop(int id)
        {
            var entity = await GetById(id);

            var entities = await GetInOrder();

            entities.MoveToFirst(entity.Position);

            RecalculatePositions(entities);

            await Save();

            return entity.Position;
        }

        public virtual async Task<int> MoveToBottom(int id)
        {
            var entity = await GetById(id);

            var entities = await GetInOrder();

            entities.MoveToLast(entity.Position);

            RecalculatePositions(entities);

            await Save();

            return entity.Position;
        }
    }
}
