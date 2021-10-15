using KHost.Common.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.App.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class SongsController : CrudController<Song, ISongsRepository>
    {
        public SongsController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            
        }

        [HttpGet]
        public async Task<IActionResult> GetByIds([FromQuery] GenericIdsRequest request)
        {
            var songs = await UnitOfWork.GetRepository<ISongsRepository>().GetByIds(request.GetIdsAsInts());

            var results = new ApiResponse(songs);

            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] GenericSearchRequest request)
        {
            var songs = await UnitOfWork.GetRepository<ISongsRepository>().Search(request.Query, request.Count, request.Offset);

            var results = new ApiResponse(songs);

            return Ok(results);
        }
    }
}
