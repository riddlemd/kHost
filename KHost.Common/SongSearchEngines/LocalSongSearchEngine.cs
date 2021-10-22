using KHost.Common.EntityFramework;
using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.SongSearchEngines
{
    public class LocalSongSearchEngine : ISongSearchEngine
    {
        public SongSearchEngine EngineDefinition { get; } = new SongSearchEngine
        {
            Name = nameof(LocalSongSearchEngine),
            DisplayName = "Local",
            IsLocal = true,
            AllowDownload = false
        };

        protected virtual DatabaseContext Context { get; }

        public LocalSongSearchEngine(DatabaseContext context)
        {
            Context = context;
        }

        public async Task<IEnumerable<SongSearchResult>> Search(string searchQuery, int? count, int? offset)
        {
            var query = Context.Songs.AsQueryable()
                .Where(song => EF.Functions.Like(song.Name, searchQuery) || EF.Functions.Like(song.BandName, searchQuery));

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            var currentEngine = GetType().Name;

            var songSearchResults = (await query.ToArrayAsync())
                .Select(song => new SongSearchResult
                {
                    Id = song.Id.ToString(),
                    SongName = song.Name,
                    BandName = song.BandName,
                    EngineName = currentEngine,
                    LengthInSeconds = 0
                });

            return songSearchResults;
        }
    }
}
