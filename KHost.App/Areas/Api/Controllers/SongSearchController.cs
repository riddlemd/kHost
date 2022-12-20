using KHost.Abstractions.Models;
using KHost.Abstractions.Providers;
using KHost.App.Areas.Api.Models.Requests;
using KHost.App.Areas.Api.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace KHost.App.Areas.Api.Controllers
{
    public class SongSearchController : BaseApiController
    {
        protected ISongSearchProvider SongSearchProvider { get; }

        public SongSearchController(ISongSearchProvider songSearchProvider)
        {
            SongSearchProvider = songSearchProvider;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] SongSearchRequest request)
        {
            var songSearchResults = await SongSearchProvider.SearchAsync(request.Query!, request.Engine!, request.Count, request.Offset);

            var response = new ApiResponse<IEnumerable<SongSearchResult>>(songSearchResults);

            return Ok(response);
        }

        [HttpGet]
        public Task<IActionResult> GetSongSearchEngines()
        {
            var songSearchEngineDetails = SongSearchProvider.GetSongSearchEngineDetails();

            var response = new ApiResponse<IEnumerable<SongSearchEngineDetails>>(songSearchEngineDetails);

            return Task.FromResult<IActionResult>(Ok(response));
        }

        [HttpGet]
        public async Task<IActionResult> GetSong([FromQuery] GetSongRequest request)
        {
            var song = await SongSearchProvider.GetSongAsync(request.Id!, request.Engine!);

            var response = new ApiResponse<Song>(song);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> DownloadSong(DownloadSongRequest request)
        {
            var download = await SongSearchProvider.DownloadSongAsync(request.Id!, request.Engine!, (int)request.SongId!);

            var response = new ApiResponse<Download>(download);

            return Ok(response);
        }

        #region Requests

        public class SongSearchRequest : GenericSearchRequest
        {
            [Required]
            public string? Engine { get; set; }
        }

        public class GetSongRequest
        {
            [Required]
            public string? Id { get; set; }

            [Required]
            public string? Engine { get; set; }
        }

        public class DownloadSongRequest
        {
            [Required]
            public string? Id { get; set; }

            [Required]
            public string? Engine { get; set; }

            [Required]
            public int? SongId { get; set; }
        }

        #endregion
    }
}
