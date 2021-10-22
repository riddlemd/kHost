using KHost.Common.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

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
            var songs = await DefaultRepository.Search(request.Query, request.Count, request.Offset);

            var response = new ApiResponse<IEnumerable<Song>>(songs);

            return Ok(response);
        }
    }
}
