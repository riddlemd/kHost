using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using KHost.Abstractions.Repositories;
using KHost.Abstractions.Models;
using KHost.Abstractions.ErrorHandling;

namespace KHost.App.Controllers.Api
{
    public class SongsController : CrudController<Song, ISongsRepository>
    {
        public SongsController(ISongsRepository defaultRepository) : base(defaultRepository)
        {
            
        }

        [HttpGet]
        public async Task<IActionResult> FindByIds([FromQuery] GenericIdsRequest request)
        {
            var songs = await DefaultRepository.FindByIds(request.GetIdsAsInts());

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
