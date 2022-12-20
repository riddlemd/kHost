using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.EntityFramework.Repositories.Components;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework.Repositories
{
    public class EntityFrameworkSongsRepository : BaseEntityFrameworkRepository<Song>, ISongsRepository
    {
        private readonly SearchComponent<Song> _searchComponent;

        public EntityFrameworkSongsRepository(DatabaseContext context) : base(context)
        {
            _searchComponent = new SearchComponent<Song>(context, (searchQuery, song) => EF.Functions.Like(song.Name, searchQuery) || EF.Functions.Like(song.BandName, searchQuery));
        }

        public async Task<IEnumerable<Song>> SearchAsync(string searchQuery, int? count, int? offset)
            => await _searchComponent.SearchAsync(searchQuery, count, offset);
    }
}
