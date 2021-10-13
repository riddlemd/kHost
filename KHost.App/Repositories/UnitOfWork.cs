using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace KHost.App.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private DbContext Context { get; }

        private List<IRepository> Repositories { get; } = new List<IRepository>();

        public UnitOfWork(
            DbContext context,
            IQueuedSingersRepository queuedSingersRepository,
            IQueuedSongsRepository queuedSongsRepository,
            ISingersRepository singersRepository,
            ISongsRepository songsRepository
        )
        {
            Context = context;
            Repositories.Add(queuedSingersRepository);
            Repositories.Add(queuedSongsRepository);
            Repositories.Add(singersRepository);
            Repositories.Add(songsRepository);
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

        public int Complete() => Context.SaveChanges();

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
