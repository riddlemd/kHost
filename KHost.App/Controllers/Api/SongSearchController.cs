using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.App.Providers;
using KHost.App.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class SongSearchController : BaseApiController
    {
        protected SongSearchProvider SongSearchProvider { get; }

        public SongSearchController(SongSearchProvider songSearchProvider, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            SongSearchProvider = songSearchProvider;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] SongSearchRequest request)
        {
            var songSearchResults = await SongSearchProvider.Search(request.Query, request.Engine, request.Count, request.Offset);

            var response = new ApiResponse(songSearchResults);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetSongSearchEngines()
        {
            var songSearchEngines = SongSearchProvider.GetSongSearchEngineDefinitions();

            var response = new ApiResponse (songSearchEngines);

            return Ok(response);
        }

        #region Requests

        public class SongSearchRequest : GenericSearchRequest
        {
            public string Engine { get; set; }
        }

        #endregion
    }
}
