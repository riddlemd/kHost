using KHost.Common.Repositories.EF;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private DatabaseContext DatabaseContext { get; }

        private MemoryContext MemoryContext { get; }

        private List<IRepository> Repositories { get; } = new List<IRepository>();

        public UnitOfWork(
            DatabaseContext databaseContext,
            MemoryContext memoryContext,
            IQueuedSingersRepository queuedSingersRepository,
            IQueuedSongsRepository queuedSongsRepository,
            ISingersRepository singersRepository,
            ISongsRepository songsRepository,
            IVenuesRepository venuesRepositry,
            IDownloadsRepository downloadsRepository
        )
        {
            DatabaseContext = databaseContext;
            MemoryContext = memoryContext;
            Repositories.Add(queuedSingersRepository);
            Repositories.Add(queuedSongsRepository);
            Repositories.Add(singersRepository);
            Repositories.Add(songsRepository);
            Repositories.Add(venuesRepositry);
            Repositories.Add(downloadsRepository);
        }

        public IEnumerable<IRepository> GetRepositories() => Repositories.ToArray();

        public TRepository GetRepository<TRepository>()
            where TRepository : class
        {
            foreach (var repository in Repositories)
            {
                if (repository is TRepository castedRepository)
                    return castedRepository;
            }

            return null;
        }

        public async Task Complete()
        {
            var tasks = new List<Task>
            {
                DatabaseContext.SaveChangesAsync(),
                MemoryContext.SaveChangesAsync()
            };

            await Task.WhenAll(tasks);
        }

        public void Dispose()
        {
            DatabaseContext.Dispose();
            MemoryContext.Dispose();
        }
    }
}
