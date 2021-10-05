using KHost.App.Models;
using KHost.App.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Providers
{
    public abstract class ProviderWithRepository<TModel, TRepository>
        where TModel : BaseModel
        where TRepository : IRepository<TModel>
    {
        protected TRepository DefaultRepository { get; }

        public ProviderWithRepository(TRepository defaultRepository)
        {
            DefaultRepository = defaultRepository;
        }
    }
}
