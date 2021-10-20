using KHost.Common.Models;
using KHost.Common.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Providers
{
    public class DefaultSongSearchProvider : ISongSearchProvider
    {
        private ISongSearchRepository[] SongSearchRepositories { get; }

        public DefaultSongSearchProvider(IServiceProvider services)
        {
            SongSearchRepositories = services.GetServices<ISongSearchRepository>().ToArray();
        }

        public async Task<IEnumerable<SongSearchResult>> Search(string searchQuery, string searchEngine, int? count = null, int? offset = null)
        {
            var repository = GetSongSearchRepositry(searchEngine);

            var songSearchResults = await repository.Search(searchQuery, count, offset);

            return songSearchResults;
        }

        public IEnumerable<SongSearchEngine> GetSongSearchEngineDefinitions() => SongSearchRepositories.Select(r => r.EngineDefinition);

        private ISongSearchRepository GetSongSearchRepositry(string typeName)
        {
            foreach (var songSearchRepository in SongSearchRepositories)
            {
                if (songSearchRepository.GetType().Name == typeName)
                    return songSearchRepository;
            }

            return null;
        }
    }
}
