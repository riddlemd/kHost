using KHost.App.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        protected async Task<IEnumerable<TModel>> GetInOrder()
        {
            throw new NotImplementedException();
            //var connection = SqlClientProvider.Connection;

            //return (await connection.GetAllAsync<TModel>()).OrderBy(qs => qs.Position);
        }

        public virtual async Task<int> MoveDown(int id)
        {
            throw new NotImplementedException();
            /*
            var connection = SqlClientProvider.Connection;

            var model = GetById(id) as IModelWithPosition;

            var models = (await GetInOrder()).ToList();

            models.Move(model.Position, model.Position + 1);

            RecalculatePositions(models);

            if (!await connection.UpdateAsync(models))
                throw new FailedToUpdateRecordException();

            return model.Position;
            */
        }

        public virtual async Task<int> MoveToBottom(int id)
        {
            throw new NotImplementedException();
            /*
            var connection = SqlClientProvider.Connection;

            var model = GetById(id) as IModelWithPosition;

            var models = (await GetInOrder()).ToList();

            models.MoveToLast(model.Position);

            RecalculatePositions(models);

            if (!await connection.UpdateAsync(models))
                throw new FailedToUpdateRecordException();

            return model.Position;
            */
        }

        public virtual async Task<int> MoveToTop(int id)
        {
            throw new NotImplementedException();
            /*
            var connection = SqlClientProvider.Connection;

            var model = GetById(id) as IModelWithPosition;

            var models = (await GetInOrder()).ToList();

            models.MoveToFirst(model.Position);

            RecalculatePositions(models);

            if (!await connection.UpdateAsync(models))
                throw new FailedToUpdateRecordException();

            return model.Position;
            */
        }

        public virtual async Task<int> MoveUp(int id)
        {
            throw new NotImplementedException();
            /*
            var connection = SqlClientProvider.Connection;

            var model = GetById(id) as IModelWithPosition;

            var models = (await GetInOrder()).ToList();

            models.Move(model.Position, model.Position - 1);

            RecalculatePositions(models);

            if (!await connection.UpdateAsync(models))
                throw new FailedToUpdateRecordException();

            return model.Position;
            */
        }
    }
}
