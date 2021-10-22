using KHost.Common.EntityFramework;
using KHost.Common.Models;
using KHost.Common.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.SongSearchEngines
{
    public class LocalSongSearchEngine : ISongSearchEngine
    {
        private ISongsRepository SongsRepository { get; }

        public LocalSongSearchEngine(ISongsRepository songsRepository)
        {
            SongsRepository = songsRepository;
        }

        public async Task<IEnumerable<SongSearchResult>> Search(string searchQuery, int? count, int? offset)
        {
            var currentEngine = GetType().Name;

            var songs = await SongsRepository.Search(searchQuery, count, offset);

            var songSearchResults = songs
                .Select(song => new SongSearchResult
                {
                    Id = song.Id.ToString()!,
                    SongName = song.Name,
                    BandName = song.BandName,
                    EngineName = currentEngine,
                    LengthInSeconds = 0
                });

            return songSearchResults;
        }

        public SongSearchEngineDetails GetDetails() => new ()
        {
            Name = nameof(LocalSongSearchEngine),
            DisplayName = "Local",
            IsLocal = true,
            AllowDownload = false
        };
    }
}
