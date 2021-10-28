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
    public class EntityFrameworkSingerPerformancesRepository : BaseEntityFrameworkRepository<SingerPerformance>, ISingerPerformancesRepository
    {
        public EntityFrameworkSingerPerformancesRepository(DatabaseContext context) : base(context)
        {

        }

        public async Task<IEnumerable<SingerPerformance>> FindBySingerId(int id)
        {
            var singerPerformances = Context.Set<SingerPerformance>()
                .Where(sp => sp.SingerId == id)
                .OrderByDescending(sp => sp.Date);

            return await singerPerformances.ToListAsync();
        }
    }
}
