using KHost.Common.EntityFramework;
using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EntityFramework
{
    public class EntityFrameworkSingersRepository : BaseEntityFrameworkRepository<Singer>, ISingersRepository
    {
        public EntityFrameworkSingersRepository(DatabaseContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Singer>> Search(string searchQuery, int? count, int? offset)
        {
            var query = Context.Set<Singer>().AsQueryable()
                .Where(singer => Microsoft.EntityFrameworkCore.EF.Functions.Like(singer.Name, searchQuery));

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            return await query.ToArrayAsync();
        }
    }
}
