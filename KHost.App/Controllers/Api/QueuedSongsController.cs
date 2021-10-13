using KHost.App.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.App.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class QueuedSongsController : CrudController<QueuedSong, IQueuedSongsRepository>
    {
        public QueuedSongsController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            
        }

        [HttpPost]
        public async Task<IActionResult> MoveUp([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSongsRepository>().MoveUp(request.Id);
            UnitOfWork.Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveDown([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSongsRepository>().MoveDown(request.Id);
            UnitOfWork.Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToTop([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSongsRepository>().MoveToTop(request.Id);
            UnitOfWork.Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToBottom([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSongsRepository>().MoveToBottom(request.Id);
            UnitOfWork.Complete();

            var response = new ApiResponse();

            return Ok(response);
        }
    }
}
