﻿using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class VenuesController : CrudController<Venue, IVenuesRepository>
    {
        public VenuesController(IVenuesRepository defaultRepository) : base(defaultRepository)
        {

        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] GenericSearchRequest request)
        {
            var venues = await DefaultRepository.SearchAsync(request.Query!, request.Count, request.Offset);

            var response = new ApiResponse<IEnumerable<Venue>>(venues);

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> FindByIds([FromQuery] GenericIdsRequest request)
        {
            var venues = await DefaultRepository.FindByIdsAsync(request.GetIdsAsInts());

            var response = new ApiResponse<IEnumerable<Venue>>(venues);

            return Ok(response);
        }
    }
}
