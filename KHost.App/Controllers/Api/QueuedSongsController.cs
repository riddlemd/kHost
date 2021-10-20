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
        public QueuedSongsController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            
        }

        [HttpGet]
        public async Task<IActionResult> GetByQueuedSingerId([FromQuery] GenericIdRequest request)
        {
            var queuedSongs = await UnitOfWork.GetRepository<IQueuedSongsRepository>().GetByQueuedSingerId(request.Id);

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
            var newPosition = await UnitOfWork.GetRepository<IQueuedSongsRepository>().MoveUp(request.Id);
            await UnitOfWork .Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveDown([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSongsRepository>().MoveDown(request.Id);
            await UnitOfWork .Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToTop([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSongsRepository>().MoveToTop(request.Id);
            await UnitOfWork .Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToBottom([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSongsRepository>().MoveToBottom(request.Id);
            await UnitOfWork .Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveBefore([FromBody] MoveBeforeRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSongsRepository>().MoveBefore(request.BeforeId, request.Id);
            await UnitOfWork .Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        #endregion
    }
}
