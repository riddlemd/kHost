using KHost.Common.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace KHost.App.Controllers.Api
{
    public class SingersController : CrudController<Singer, ISingersRepository>
    {
        public SingersController(ISingersRepository defaultRepository) : base(defaultRepository)
        {

        }

        [HttpGet]
        public async Task<IActionResult> FindByIds([FromQuery] GenericIdsRequest request)
        {
            var singers = await DefaultRepository.FindByIds(request.GetIdsAsInts());

            var response = new ApiResponse<IEnumerable<Singer>>(singers);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] GenericSearchRequest request)
        {
            var singers = await DefaultRepository.Search(request.Query, request.Count, request.Offset);

            var response = new ApiResponse<IEnumerable<Singer>>(singers);

            return Ok(response);
        }
    }
}
