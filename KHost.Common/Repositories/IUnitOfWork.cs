using System;
using System.Collections.Generic;

namespace KHost.Common.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IEnumerable<IRepository> GetRepositories();

        public TRepository GetRepository<TRepository>() where TRepository : class;

        int Complete();
    }
}
