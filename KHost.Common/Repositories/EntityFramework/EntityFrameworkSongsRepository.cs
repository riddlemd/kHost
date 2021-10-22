using KHost.Common.EntityFramework;
using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.EntityFramework
{
    public class EntityFrameworkSongsRepository : BaseEntityFrameworkRepository<Song>, ISongsRepository
    {
        public EntityFrameworkSongsRepository(DatabaseContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Song>> Search(string searchQuery, int? count, int? offset)
        {
            var query = Context.Set<Song>().AsQueryable()
                .Where(song => EF.Functions.Like(song.Name, searchQuery) || EF.Functions.Like(song.BandName, searchQuery));

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            return await query.ToArrayAsync();
        }
    }
}
