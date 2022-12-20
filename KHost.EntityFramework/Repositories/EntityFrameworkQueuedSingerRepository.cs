using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.EntityFramework.Repositories.Components;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework.Repositories
{
    internal class EntityFrameworkQueuedSingerRepository : BaseEntityFrameworkRepository<QueuedSinger>, IQueuedSingersRepository
    {
        private readonly QueueComponent<QueuedSinger> _queueComponent;

        public EntityFrameworkQueuedSingerRepository(DatabaseContext context) : base(context)
        {
            _queueComponent = new QueueComponent<QueuedSinger>(context);
        }

        public Task<QueuedSinger?> GetFirstAsync()
            => _queueComponent.GetFirstAsync();

        public Task<QueuedSinger?> GetLastAsync()
            => _queueComponent.GetLastAsync();

        public Task<int> MoveDownAsync(int id)
            => _queueComponent.MoveDownAsync(id);

        public Task<int> MoveToAsync(int id, int position)
            => _queueComponent.MoveToAsync(id, position);

        public Task<int> MoveToBottomAsync(int id)
            => _queueComponent.MoveToBottomAsync(id);

        public Task<int> MoveToTopAsync(int id)
            => _queueComponent.MoveToTopAsync(id);

        public Task<int> MoveUpAsync(int id)
            => _queueComponent.MoveUpAsync(id);

        public override async Task<IEnumerable<QueuedSinger>> Fetch(int? count = null, int? offset = null)
        {
            var query = BuildFetchQuery(count, offset)
                .OrderBy(qs => qs.Position);

            var queuedSingers = await query.ToArrayAsync();

            foreach (var queuedSinger in queuedSingers)
            {
                var queuedSongsCount = Context.Set<QueuedSong>()
                    .Where(qs => qs.QueuedSingerId == queuedSinger.Id)
                    .Count();

                queuedSinger.QueuedSongsCount = queuedSongsCount;
            }

            return queuedSingers;
        }
    }
}
