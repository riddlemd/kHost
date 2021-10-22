using KHost.Common.EntityFramework;
using KHost.Common.ErrorHandling;
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
        public string Name => "local";

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
            Name = Name,
            DisplayName = "Local",
            IsLocal = true,
            AllowDownload = false
        };

        public async Task<Song> GetSong(string id)
        {
            if (!int.TryParse(id, out var intId)) throw new KHostException("Id must be int");

            var song = await SongsRepository.FindById(intId);

            _ = song ?? throw new KHostException("Song not found");

            return song;
        }

        public Task<Download> DownloadSong(string id, int songId) => throw new NotSupportedException();
    }
}
