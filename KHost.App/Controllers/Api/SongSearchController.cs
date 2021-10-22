﻿using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.Common.Models;
using KHost.Common.Providers;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
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
            var songSearchResults = await SongSearchProvider.Search(request.Query!, request.Engine, request.Count, request.Offset);

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

        #region Requests

        public class SongSearchRequest : GenericSearchRequest
        {
            [Required]
            public string Engine { get; set; } = "";
        }

        #endregion
    }
}
