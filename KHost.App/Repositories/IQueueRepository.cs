using Dapper.Contrib.Extensions;
using KHost.App.Models;
using KHost.App.Providers;
using KHost.App.Repositories.SQLite;
using KHost.Common.Collections;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Repositories
{
    public interface IQueueRepository<TModel> : IRepository<TModel>
        where TModel : BaseModel, IModelWithPosition
    {
        abstract protected SQLiteClientProvider SqlClientProvider { get; }

        protected void RecalculatePositions(List<TModel> models)
        {
            var i = 0;
            models.ForEach(qs => qs.Position = i++);
        }

        protected async Task<IEnumerable<TModel>> GetAllInOrder()
        {
            var connection = SqlClientProvider.Connection;

            return (await connection.GetAllAsync<TModel>()).OrderBy(qs => qs.Position);
        }

        public virtual async Task<int> MoveDown(int id)
        {
            var connection = SqlClientProvider.Connection;

            var model = GetById(id) as IModelWithPosition;

            var models = (await GetAllInOrder()).ToList();

            models.Move(model.Position, model.Position + 1);

            RecalculatePositions(models);

            if (!await connection.UpdateAsync(models))
                throw new FailedToUpdateRecordException();

            return model.Position;
        }

        public virtual async Task<int> MoveToBottom(int id)
        {
            var connection = SqlClientProvider.Connection;

            var model = GetById(id) as IModelWithPosition;

            var models = (await GetAllInOrder()).ToList();

            models.MoveToLast(model.Position);

            RecalculatePositions(models);

            if (!await connection.UpdateAsync(models))
                throw new FailedToUpdateRecordException();

            return model.Position;
        }

        public virtual async Task<int> MoveToTop(int id)
        {
            var connection = SqlClientProvider.Connection;

            var model = GetById(id) as IModelWithPosition;

            var models = (await GetAllInOrder()).ToList();

            models.MoveToFirst(model.Position);

            RecalculatePositions(models);

            if (!await connection.UpdateAsync(models))
                throw new FailedToUpdateRecordException();

            return model.Position;
        }

        public virtual async Task<int> MoveUp(int id)
        {
            var connection = SqlClientProvider.Connection;

            var model = GetById(id) as IModelWithPosition;

            var models = (await GetAllInOrder()).ToList();

            models.Move(model.Position, model.Position - 1);

            RecalculatePositions(models);

            if (!await connection.UpdateAsync(models))
                throw new FailedToUpdateRecordException();

            return model.Position;
        }
    }
}
