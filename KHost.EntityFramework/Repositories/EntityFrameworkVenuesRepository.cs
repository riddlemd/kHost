using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.EntityFramework.Repositories.Components;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework.Repositories
{
    public class EntityFrameworkVenuesRepository : BaseEntityFrameworkRepository<Venue>, IVenuesRepository
    {
        private readonly SearchComponent<Venue> _searchComponent;

        public EntityFrameworkVenuesRepository(DatabaseContext context) : base(context)
        {
            _searchComponent = new SearchComponent<Venue>(context, (searchQuery, venue) => EF.Functions.Like(venue.Name, searchQuery));
        }

        public async Task<IEnumerable<Venue>> SearchAsync(string searchQuery, int? count, int? offset)
            => await _searchComponent.SearchAsync(searchQuery, count, offset);
    }
}
