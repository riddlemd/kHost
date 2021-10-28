using KHost.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Repositories
{
    public interface ISingerPerformancesRepository : IRepository<SingerPerformance>
    {
        Task<IEnumerable<SingerPerformance>> FindBySingerId(int id);
    }
}
