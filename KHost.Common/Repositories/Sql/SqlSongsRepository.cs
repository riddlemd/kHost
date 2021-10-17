﻿using KHost.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.Common.Repositories.Sql
{
    public class SqlSongsRepository : BaseSqlRepository<Song>, ISongsRepository
    {
        public SqlSongsRepository(KHostDbContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Song>> Search(string searchQuery, int? count, int? offset)
        {
            var query = Context.Set<Song>().AsQueryable()
                .Where(singer => EF.Functions.Like(singer.Name, searchQuery));

            if (offset != null)
                query = query.Skip((int)offset);

            if (count != null)
                query = query.Take((int)count);

            return await query.ToArrayAsync();
        }
    }
}
