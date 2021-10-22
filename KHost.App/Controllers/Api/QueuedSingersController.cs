using KHost.Common.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
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
            _ = await DefaultRepository.MoveUp(request.Id ?? 0);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveDown([FromBody] GenericIdRequest request)
        {
            _ = await DefaultRepository.MoveDown(request.Id ?? 0);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToTop([FromBody] GenericIdRequest request)
        {
            _ = await DefaultRepository.MoveToTop(request.Id ?? 0);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToBottom([FromBody] GenericIdRequest request)
        {
            _ = await DefaultRepository.MoveToBottom(request.Id ?? 0);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveBefore([FromBody] MoveBeforeRequest request)
        {
            _ = await DefaultRepository.MoveBefore(request.BeforeId ?? 0, request.Id ?? 0);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        #endregion
    }
}
