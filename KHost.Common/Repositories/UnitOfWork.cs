using KHost.Common.Repositories.EF;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private List<IRepository> Repositories { get; } = new List<IRepository>();

        public UnitOfWork RegisterRepository(IRepository repository)
        {
            if (!Repositories.Contains(repository))
                Repositories.Add(repository);

            return this;
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
            var contexts = GetContexts();
            var tasks = new List<Task>();

            foreach(var context in contexts)
            {
                tasks.Add(context.Save());
            }

            await Task.WhenAll(tasks);
        }

        public void Dispose()
        {
            var contexts = GetContexts();

            foreach (var context in contexts)
            {
                context.Dispose();
            }
        }

        private IEnumerable<IRepositoryContext> GetContexts() => Repositories
            .Where(r => r is IRepositoryWithContext)
            .Select(r => (r as IRepositoryWithContext).Context)
            .Distinct();
    }
}
