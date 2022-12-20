using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.EntityFramework.Repositories.Components;
using Microsoft.EntityFrameworkCore;

namespace KHost.EntityFramework.Repositories
{
    internal class EntityFrameworkSingerPerformancesRepository : BaseEntityFrameworkRepository<SingerPerformance>, ISingerPerformancesRepository
    {
        public EntityFrameworkSingerPerformancesRepository(DatabaseContext context) : base(context)
        {
            // Nothing
        }

        public async Task<IEnumerable<SingerPerformance>> FindBySingerIdAsync(int id)
        {
            var singerPerformances = Context.Set<SingerPerformance>()
                .Where(sp => sp.SingerId == id)
                .OrderByDescending(sp => sp.Date);

            return await singerPerformances.ToListAsync();
        }
    }
}
