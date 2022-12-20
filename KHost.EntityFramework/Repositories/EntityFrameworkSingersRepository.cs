using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.EntityFramework.Repositories.Components;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework.Repositories
{
    public class EntityFrameworkSingersRepository : BaseEntityFrameworkRepository<Singer>, ISingersRepository
    {
        private readonly SearchComponent<Singer> _searchComponent;

        public EntityFrameworkSingersRepository(DatabaseContext context) : base(context)
        {
            _searchComponent = new SearchComponent<Singer>(context, (searchQuery, singer) => EF.Functions.Like(singer.Name, searchQuery));
        }

        public async Task<IEnumerable<Singer>> SearchAsync(string searchQuery, int? count, int? offset)
            => await _searchComponent.SearchAsync(searchQuery, count, offset);
    }
}
