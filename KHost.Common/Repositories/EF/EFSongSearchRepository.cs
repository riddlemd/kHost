using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EF
{
    public class EFSongSearchRepository : IRepository, ISongSearchRepository
    {
        public SongSearchEngine EngineDefinition { get; } = new SongSearchEngine
        {
            Name = nameof(EFSongSearchRepository),
            DisplayName = "Local",
            IsLocal = true,
            AllowDownload = false
        };

        protected virtual DbContext Context { get; }

        public EFSongSearchRepository(KHostDbContext context)
        {
            Context = context;
        }

        public async Task<IEnumerable<SongSearchResult>> Search(string searchQuery, int? count, int? offset)
        {
            var query = Context.Set<Song>().AsQueryable()
                .Where(song => Microsoft.EntityFrameworkCore.EF.Functions.Like(song.Name, searchQuery) || Microsoft.EntityFrameworkCore.EF.Functions.Like(song.BandName, searchQuery));

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

        public Task<object> GetById(int id) => throw new NotImplementedException();

        public Task<IEnumerable<object>> GetByIds(IEnumerable<int> ids) => throw new NotImplementedException();

        public Task Create(object entity) => throw new NotImplementedException();

        public Task<IEnumerable<object>> Read(int? count = null, int? offset = null) => throw new NotImplementedException();

        public Task Update(object entity) => throw new NotImplementedException();

        public Task DeleteById(int id) => throw new NotImplementedException();

        public Task Delete(object entity) => throw new NotImplementedException();

        public Task<int> Save() => throw new NotImplementedException();
    }
}
