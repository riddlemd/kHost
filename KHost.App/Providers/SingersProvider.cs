using KHost.App.Models;
using KHost.App.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Providers
{
    public class SingersProvider : ProviderWithRepository<Singer, ISingersRepository>
    {
        public SingersProvider(ISingersRepository defaultRepository) : base(defaultRepository)
        {
        }

        public async Task<IEnumerable<Singer>> Get(int count = 20, int offset = 0) => await DefaultRepository?.Get(count, offset);

        public async Task<(bool, int?)> Save(Singer model) => await DefaultRepository?.Save(model);

        public async Task<IEnumerable<Singer>> Search(string query, int count = 20, int offset = 0) => await DefaultRepository?.Search(query, count, offset);

        public async Task<bool> Remove(int id) => await DefaultRepository?.Remove(id);
    }
}
