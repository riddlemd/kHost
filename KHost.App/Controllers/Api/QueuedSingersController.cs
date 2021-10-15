using KHost.Common.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.App.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class QueuedSingersController : CrudController<QueuedSinger, IQueuedSingersRepository>
    {
        public QueuedSingersController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            
        }

        public async Task<IActionResult> GetBySingerId([FromBody] GenericIdRequest request)
        {
            var singer = await UnitOfWork.GetRepository<IQueuedSingersRepository>().GetById(request.Id);

            var response = new ApiResponse(singer);

            return Ok(response);
        }

        // Queue Methods

        [HttpPost]
        public async Task<IActionResult> MoveUp([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSingersRepository>().MoveUp(request.Id);
            UnitOfWork.Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveDown([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSingersRepository>().MoveDown(request.Id);
            UnitOfWork.Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToTop([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSingersRepository>().MoveToTop(request.Id);
            UnitOfWork.Complete();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToBottom([FromBody] GenericIdRequest request)
        {
            var newPosition = await UnitOfWork.GetRepository<IQueuedSingersRepository>().MoveToBottom(request.Id);
            UnitOfWork.Complete();

            var response = new ApiResponse();

            return Ok(response);
        }
    }
}
