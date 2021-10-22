using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        UnitOfWork RegisterRepository(IRepository repository);

        IEnumerable<IRepository> GetRepositories();

        public TRepository? GetRepository<TRepository>() where TRepository : class;

        Task Complete();
    }
}
