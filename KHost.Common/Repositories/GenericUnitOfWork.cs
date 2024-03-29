﻿using KHost.Abstractions.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public class GenericUnitOfWork : IUnitOfWork
    {
        private List<IRepository> Repositories { get; } = new List<IRepository>();

        public IUnitOfWork RegisterRepository(IRepository repository)
        {
            if (!Repositories.Contains(repository))
                Repositories.Add(repository);

            return this;
        }

        public IEnumerable<IRepository> GetRepositories() => Repositories.ToArray();

        public TRepository? GetRepository<TRepository>()
            where TRepository : class
        {
            foreach (var repository in Repositories)
            {
                if (repository is TRepository castedRepository)
                    return castedRepository;
            }

            return null;
        }

        public async Task CompleteAsync()
        {
            var contexts = GetContexts();

            var repositoriesWithoutContext = GetRepositoriesWithoutContext();

            var tasks = new List<Task>();

            foreach (var context in contexts)
            {
                tasks.Add(context.SaveAsync());
            }

            foreach (var repository in repositoriesWithoutContext)
            {
                tasks.Add(repository.SaveAsync());
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

            var repositoriesWithoutContext = GetRepositoriesWithoutContext();

            foreach (var repository in repositoriesWithoutContext)
            {
                if (repository is not IDisposable disposableRepository) continue;

                disposableRepository.Dispose();
            }
        }

        private IEnumerable<IRepository> GetRepositoriesWithoutContext() => Repositories
            .Where(r => r is not IRepositoryWithContext);

        private IEnumerable<IRepositoryContext> GetContexts() => Repositories
            .Where(r => r is IRepositoryWithContext)
            .Select(r => (r as IRepositoryWithContext)!.Context)
            .Distinct();
    }
}
