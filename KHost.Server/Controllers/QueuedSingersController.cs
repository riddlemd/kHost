﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using KHost.Abstractions.Repositories;
using KHost.Abstractions.Models;
using KHost.Server.Models.Requests;
using KHost.Server.Models.Responses;

namespace KHost.Server.Controllers
{
    public class QueuedSingersController : CrudController<QueuedSinger, IQueuedSingersRepository>
    {
        public QueuedSingersController(IQueuedSingersRepository defaultRepository) : base(defaultRepository)
        {

        }

        #region CRUD Methods

        // Not expected to be implemented.
        public override Task<IActionResult> Update([FromBody] QueuedSinger entity) => throw new System.NotSupportedException();

        #endregion 

        #region Queue Methods

        [HttpPost]
        public async Task<IActionResult> MoveUp([FromBody] GenericIdRequest request)
        {
            var position = await DefaultRepository.MoveUpAsync((int)request.Id!);
            await DefaultRepository.SaveAsync();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveDown([FromBody] GenericIdRequest request)
        {
            var position = await DefaultRepository.MoveDownAsync((int)request.Id!);
            await DefaultRepository.SaveAsync();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToTop([FromBody] GenericIdRequest request)
        {
            var position = await DefaultRepository.MoveToTopAsync((int)request.Id!);
            await DefaultRepository.SaveAsync();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToBottom([FromBody] GenericIdRequest request)
        {
            var position = await DefaultRepository.MoveToBottomAsync((int)request.Id!);
            await DefaultRepository.SaveAsync();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveTo([FromBody] MoveToRequest request)
        {
            var position = await DefaultRepository.MoveToAsync((int)request.Id!, (int)request.Position!);
            await DefaultRepository.SaveAsync();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        #endregion
    }
}
