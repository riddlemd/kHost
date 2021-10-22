using KHost.Common.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace KHost.App.Controllers.Api
{
    public class QueuedSongsController : CrudController<QueuedSong, IQueuedSongsRepository>
    {
        public QueuedSongsController(IQueuedSongsRepository defaultRepository) : base(defaultRepository)
        {
            
        }

        [HttpGet]
        public async Task<IActionResult> FindByQueuedSingerId([FromQuery] GenericIdRequest request)
        {
            var queuedSongs = await DefaultRepository.FindByQueuedSingerId(request.Id);

            var response = new ApiResponse<IEnumerable<QueuedSong>>(queuedSongs);

            return Ok(response);
        }

        #region CRUD Methods

        // Not expected to be implemented.
        public override Task<IActionResult> Update([FromBody] QueuedSong entity) => throw new System.NotSupportedException();

        #endregion 

        #region Queue Methods

        [HttpPost]
        public async Task<IActionResult> MoveUp([FromBody] GenericIdRequest request)
        {
            var newPosition = await DefaultRepository.MoveUp(request.Id);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveDown([FromBody] GenericIdRequest request)
        {
            var newPosition = await DefaultRepository.MoveDown(request.Id);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToTop([FromBody] GenericIdRequest request)
        {
            var newPosition = await DefaultRepository.MoveToTop(request.Id);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToBottom([FromBody] GenericIdRequest request)
        {
            var newPosition = await DefaultRepository.MoveToBottom(request.Id);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveBefore([FromBody] MoveBeforeRequest request)
        {
            var newPosition = await DefaultRepository.MoveBefore(request.BeforeId, request.Id);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        #endregion
    }
}
