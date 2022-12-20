using KHost.Abstractions.ErrorHandling;
using KHost.Abstractions.Models;
using KHost.Abstractions.Providers;
using KHost.Abstractions.Repositories;
using KHost.Abstractions.SongSearchEngines;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Providers
{
    internal class DefaultSongSearchProvider : ISongSearchProvider
    {
        private readonly List<ISongSearchEngine> _songSearchEngines;

        private readonly IDownloadsRepository _downloadsRepository;

        public DefaultSongSearchProvider(IServiceProvider services, IDownloadsRepository downloadsRepository)
        {
            _songSearchEngines = services.GetServices<ISongSearchEngine>().ToList();
            _downloadsRepository = downloadsRepository;
        }

        public IEnumerable<SongSearchEngineDetails> GetSongSearchEngineDetails()
            => _songSearchEngines.Select(r => r.GetDetails());

        public async Task<IEnumerable<SongSearchResult>> SearchAsync(string searchQuery, string searchEngine, int? count = null, int? offset = null)
        {
            var engine = GetSongSearchEngine(searchEngine);

            var songSearchResults = await engine.Search(searchQuery, count, offset);

            return songSearchResults;
        }

        public Task<Song> GetSongAsync(string id, string searchEngine)
        {
            var engine = GetSongSearchEngine(searchEngine);

            return engine.GetSong(id);
        }

        public async Task<Download> DownloadSongAsync(string id, string searchEngine, int songId)
        {
            var engine = GetSongSearchEngine(searchEngine);

            var download = await engine.DownloadSong(id, songId);

            await _downloadsRepository.CreateAsync(download);
            await _downloadsRepository.SaveAsync();

            return download;
        }

        private ISongSearchEngine GetSongSearchEngine(string name)
            => _songSearchEngines.FirstOrDefault(se => se.Name == name)
            ?? throw new KHostException($"Search Engine '{name}' could not be found");
    }
}
