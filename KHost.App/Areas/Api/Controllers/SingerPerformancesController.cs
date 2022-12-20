using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.App.Areas.Api.Models.Requests;
using KHost.App.Areas.Api.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.App.Areas.Api.Controllers
{
    public class SingerPerformancesController : CrudController<SingerPerformance, ISingerPerformancesRepository>
    {
        public SingerPerformancesController(ISingerPerformancesRepository defaultRepository) : base(defaultRepository)
        {

        }

        [HttpGet]
        public async Task<IActionResult> FindBySingerId([FromQuery] GenericIdRequest request)
        {
            var singerPerformances = await DefaultRepository.FindBySingerIdAsync(request.Id ?? 0);

            var response = new ApiResponse<IEnumerable<SingerPerformance>>(singerPerformances);

            return Ok(response);
        }
    }
}
