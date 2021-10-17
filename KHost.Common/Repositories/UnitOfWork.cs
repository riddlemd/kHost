﻿using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace KHost.Common.Repositories
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
            ISongsRepository songsRepository,
            IVenuesRepository venuesRepositry
        )
        {
            Context = context;
            Repositories.Add(queuedSingersRepository);
            Repositories.Add(queuedSongsRepository);
            Repositories.Add(singersRepository);
            Repositories.Add(songsRepository);
            Repositories.Add(venuesRepositry);
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