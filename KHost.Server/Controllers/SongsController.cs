using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using KHost.Abstractions.Repositories;
using KHost.Abstractions.Models;
using KHost.Abstractions.ErrorHandling;
using KHost.Server.Models.Requests;
using KHost.Server.Models.Responses;

namespace KHost.Server.Controllers
{
    public class SongsController : CrudController<Song, ISongsRepository>
    {
        public SongsController(ISongsRepository defaultRepository) : base(defaultRepository)
        {

        }

        [HttpGet]
        public async Task<IActionResult> FindByIds([FromQuery] GenericIdsRequest request)
        {
            var songs = await DefaultRepository.FindByIdsAsync(request.GetIdsAsInts());

            var response = new ApiResponse<IEnumerable<Song>>(songs);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] GenericSearchRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Query))
                throw new KHostException("Search requires a query", httpStatusCode: System.Net.HttpStatusCode.BadRequest);

            var songs = await DefaultRepository.SearchAsync(request.Query, request.Count, request.Offset);

            var response = new ApiResponse<IEnumerable<Song>>(songs);

            return Ok(response);
        }
    }
}
