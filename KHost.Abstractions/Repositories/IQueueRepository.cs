using KHost.Abstractions.Models;

namespace KHost.Abstractions.Repositories
{
    public interface IQueueRepository<TModel> : IRepository<TModel>
        where TModel : class, IModelWithId, IModelWithPosition
    {
        public Task<int> MoveUpAsync(int id);

        public Task<int> MoveDownAsync(int id);

        public Task<int> MoveToTopAsync(int id);

        public Task<int> MoveToBottomAsync(int id);

        public Task<int> MoveToAsync(int id, int position);

        public Task<TModel?> GetFirstAsync();

        public Task<TModel?> GetLastAsync();
    }
}
