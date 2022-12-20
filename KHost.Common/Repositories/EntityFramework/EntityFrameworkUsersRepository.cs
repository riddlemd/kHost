using KHost.Common.EntityFramework;
using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EntityFramework
{
    public class EntityFrameworkUsersRepository : BaseEntityFrameworkRepository<User>, IUsersRepository
    {
        public EntityFrameworkUsersRepository(DatabaseContext context) : base(context)
        {

        }

        public async Task<IEnumerable<User>> Search(string searchQuery, int? count, int? offset)
        {
            var query = Context.Set<User>()
                .AsQueryable()
                .Where(user => EF.Functions.Like(user.Username, searchQuery));

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            return await query.ToListAsync();
        }
    }
}
