using KHost.App.Models.Responses;
using KHost.Common.Providers;
using KHost.Common.SongImporters;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class SongImportersController : BaseApiController
    {
        protected ISongImporterProvider SongImporterProvider { get; }

        public SongImportersController(ISongImporterProvider songImporterProvider)
        {
            SongImporterProvider = songImporterProvider;
        }

        [HttpGet]
        public async Task<IActionResult> Find([FromQuery] BaseImporterRequest request)
        {
            var importableSongs = await SongImporterProvider.Find(request.Path!, request.Importer!);

            var response = new ApiResponse<IEnumerable<ImportableSong>>(importableSongs);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetDetails([FromQuery] BaseImporterRequest request)
        {
            var importableSong = await SongImporterProvider.GetDetails(request.Path!, request.Importer!);

            var response = new ApiResponse<ImportableSong>(importableSong);

            return Ok(response);
        }

        #region Requests
        
        public class BaseImporterRequest
        {
            [Required]
            public string? Path { get; set; }

            [Required]
            public string? Importer { get; set; }
        }

        #endregion
    }
}
