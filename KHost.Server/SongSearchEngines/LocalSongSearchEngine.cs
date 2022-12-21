using KHost.Abstractions.ErrorHandling;
using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.Abstractions.SongSearchEngines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.SongSearchEngines
{
    internal class LocalSongSearchEngine : ISongSearchEngine
    {
        public string Name => "local";

        private ISongsRepository SongsRepository { get; }

        public LocalSongSearchEngine(ISongsRepository songsRepository)
        {
            SongsRepository = songsRepository;
        }

        public async Task<IEnumerable<SongSearchResult>> SearchAsync(string searchQuery, int? count, int? offset)
        {
            var songs = await SongsRepository.SearchAsync(searchQuery, count, offset);

            var songSearchResults = songs
                .Select(song => new SongSearchResult
                {
                    Id = song.Id.ToString()!,
                    SongName = song.Name,
                    BandName = song.BandName,
                    State = song.State.ToString(),
                    EngineName = Name,
                    LengthInSeconds = 0
                });

            return songSearchResults;
        }

        public SongSearchEngineDetails GetDetails() => new()
        {
            Name = Name,
            DisplayName = "Local",
            AllowDownload = false
        };

        public async Task<Song> GetSongAsync(string id)
        {
            if (!int.TryParse(id, out var intId))
                throw new KHostException("Id must be int");

            var song = await SongsRepository.FindByIdAsync(intId);

            if(song is null)
                throw new KHostException("Song not found");

            return song;
        }

        public Task<Download> DownloadSongAsync(string id, int songId)
            => throw new NotSupportedException();
    }
}
