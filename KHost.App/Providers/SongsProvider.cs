using KHost.App.Models;
using KHost.App.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Providers
{
    public class SongsProvider : ProviderWithRepository<Song, ISongRepository>
    {
        public SongsProvider(ISongRepository defaultRepository) : base(defaultRepository)
        {
        }

        public async Task<IEnumerable<Song>> GetAll() => await DefaultRepository?.GetAll();

        public async Task<(bool, int?)> Save(Song model) => await DefaultRepository?.Save(model);

        public async Task<IEnumerable<Song>> Search(string query) => await DefaultRepository?.Search(query);

        public async Task<bool> Remove(int id) => await DefaultRepository?.Remove(id);
    }
}
