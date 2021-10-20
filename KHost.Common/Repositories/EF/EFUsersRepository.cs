using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EF
{
    public class EFUsersRepository : BaseEFRepository<User>, IUsersRepository
    {
        public EFUsersRepository(DatabaseContext context) : base(context)
        {

        }

        public async Task<IEnumerable<User>> Search(string searchQuery, int? count, int? offset)
        {
            var query = Context.Set<User>().AsQueryable()
                .Where(user => Microsoft.EntityFrameworkCore.EF.Functions.Like(user.Username, searchQuery));

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            return await query.ToArrayAsync();
        }
    }
}
