using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.EntityFramework.Repositories.Components;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework.Repositories
{
    public class EntityFrameworkQueuedSongRepository : BaseEntityFrameworkRepository<QueuedSong>, IQueuedSongsRepository
    {
        private readonly QueueComponent<QueuedSong> _queueComponent;

        public EntityFrameworkQueuedSongRepository(DatabaseContext context) : base(context)
        {
            _queueComponent = new QueueComponent<QueuedSong>(context);
        }

        public Task<QueuedSong?> GetFirstAsync()
            => _queueComponent.GetFirstAsync();

        public Task<QueuedSong?> GetLastAsync()
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

        public async Task<QueuedSong?> GetLastBySingerIdAsync(int queuedSingerId)
            => await Context.Set<QueuedSong>().Where(e => e.QueuedSingerId == queuedSingerId).OrderBy(e => e.Position).LastOrDefaultAsync();

        public async Task<IEnumerable<QueuedSong>> FindByQueuedSingerId(int id)
        {
            var queuedSongs = Context.Set<QueuedSong>()
                .Where(qs => qs.QueuedSingerId == id)
                .OrderBy(qs => qs.Position);

            return await queuedSongs.ToListAsync();
        }

        protected override IQueryable<QueuedSong> BuildFetchQuery(int? count = null, int? offset = null)
        {
            var query = base.BuildFetchQuery(count, offset)
                .OrderBy(qs => qs.Position);


            return query;
        }

        public async override Task Create(QueuedSong entity)
        {
            var lastQueuedSong = await GetLastBySingerIdAsync(entity.QueuedSingerId);

            entity.Position = (lastQueuedSong?.Position ?? -1) + 1;

            await base.Create(entity);
        }
    }
}
