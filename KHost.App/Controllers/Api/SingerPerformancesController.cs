using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.Common.Models;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class SingerPerformancesController : CrudController<SingerPerformance, ISingerPerformancesRepository>
    {
        public SingerPerformancesController(ISingerPerformancesRepository defaultRepository) : base(defaultRepository)
        {

        }

        [HttpGet]
        public async Task<IActionResult> FindBySingerId([FromQuery] GenericIdRequest request)
        {
            var singerPerformances = await DefaultRepository.FindBySingerId(request.Id ?? 0);

            var response = new ApiResponse<IEnumerable<SingerPerformance>>(singerPerformances);

            return Ok(response);
        }
    }
}
