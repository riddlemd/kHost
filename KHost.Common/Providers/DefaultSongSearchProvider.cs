using KHost.Common.Models;
using KHost.Common.Repositories;
using KHost.Common.SongSearchEngines;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Providers
{
    public class DefaultSongSearchProvider : ISongSearchProvider
    {
        private ISongSearchEngine[] SongSearchRepositories { get; }

        public DefaultSongSearchProvider(IServiceProvider services)
        {
            SongSearchRepositories = services.GetServices<ISongSearchEngine>().ToArray();
        }

        public async Task<IEnumerable<SongSearchResult>> Search(string searchQuery, string searchEngine, int? count = null, int? offset = null)
        {
            var repository = GetSongSearchRepositry(searchEngine);

            _ = repository ?? throw new Exception($"Search Engine '{searchEngine}' could not be found");

            var songSearchResults = await repository.Search(searchQuery, count, offset);

            return songSearchResults;
        }

        public IEnumerable<SongSearchEngineDetails> GetSongSearchEngineDetails() => SongSearchRepositories.Select(r => r.GetDetails());

        private ISongSearchEngine? GetSongSearchRepositry(string typeName)
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
