using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.EntityFramework.Repositories.Components;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework.Repositories
{
    internal class EntityFrameworkUsersRepository : BaseEntityFrameworkRepository<User>, IUsersRepository
    {
        private readonly SearchComponent<User> _searchComponent;

        public EntityFrameworkUsersRepository(DatabaseContext context) : base(context)
        {
            _searchComponent = new SearchComponent<User>(context, (searchQuery, user) => EF.Functions.Like(user.Username, searchQuery));
        }

        public async Task<IEnumerable<User>> SearchAsync(string searchQuery, int? count, int? offset)
            => await _searchComponent.SearchAsync(searchQuery, count, offset);
    }
}
