using KHost.App.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.App.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class SingersController : CrudController<Singer, ISingersRepository>
    {
        public SingersController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetByIds([FromQuery] GenericIdsRequest request)
        {
            var singers = await UnitOfWork.GetRepository<ISingersRepository>().GetByIds(request.Ids);

            var results = new ApiResponse(singers);

            return Ok(results);
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] GenericSearchRequest request)
        {
            var singers = await UnitOfWork.GetRepository<ISingersRepository>().Search(request.Query, request.Count, request.Offset);

            var results = new ApiResponse(singers);

            return Ok(results);
        }
    }
}
