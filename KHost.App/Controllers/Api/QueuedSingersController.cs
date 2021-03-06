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
            var position = await DefaultRepository.MoveUp((int)request.Id!);
            await DefaultRepository.Save();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveDown([FromBody] GenericIdRequest request)
        {
            var position = await DefaultRepository.MoveDown((int)request.Id!);
            await DefaultRepository.Save();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToTop([FromBody] GenericIdRequest request)
        {
            var position = await DefaultRepository.MoveToTop((int)request.Id!);
            await DefaultRepository.Save();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveToBottom([FromBody] GenericIdRequest request)
        {
            var position = await DefaultRepository.MoveToBottom((int)request.Id!);
            await DefaultRepository.Save();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> MoveTo([FromBody] MoveToRequest request)
        {
            var position = await DefaultRepository.MoveTo((int)request.Id!, (int)request.Position!);
            await DefaultRepository.Save();

            var response = new ApiResponse<int>(position);

            return Ok(response);
        }

        #endregion
    }
}
