using KHost.Common.EntityFramework;
using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EntityFramework
{
    public class EntityFrameworkVenuesRepository : BaseEntityFrameworkRepository<Venue>, IVenuesRepository
    {
        public EntityFrameworkVenuesRepository(DatabaseContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Venue>> Search(string searchQuery, int? count, int? offset)
        {
            var query = Context.Set<Venue>().AsQueryable()
                .Where(venue => EF.Functions.Like(venue.Name, searchQuery));

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            return await query.ToArrayAsync();
        }
    }
}
