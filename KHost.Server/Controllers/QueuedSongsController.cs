using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.Server.Models.Requests;
using KHost.Server.Models.Responses;

namespace KHost.Server.Controllers
{
    public class QueuedSongsController : CrudController<QueuedSong, IQueuedSongsRepository>
    {
        public QueuedSongsController(IQueuedSongsRepository defaultRepository) : base(defaultRepository)
        {

        }

        [HttpGet]
        public async Task<IActionResult> FindByQueuedSingerId([FromQuery] GenericIdRequest request)
        {
            var queuedSongs = await DefaultRepository.FindByQueuedSingerIdAsync(request.Id ?? 0);

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
