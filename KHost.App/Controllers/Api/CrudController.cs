using KHost.Common.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace KHost.App.Controllers.Api
{
    public abstract class CrudController<TModel, TRepository> : BaseApiController
        where TModel : class, IModelWithId
        where TRepository : class, IRepository<TModel>
    {
        protected TRepository DefaultRepository { get; }

        public CrudController(TRepository defaultRepository)
        {
            DefaultRepository = defaultRepository;
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] TModel entity)
        {
            await DefaultRepository.Create(entity);
            await DefaultRepository.Save();

            var response = new ApiResponse<TModel>(entity);

            return Ok(response);
        }

        [HttpGet]
        public virtual async Task<IActionResult> Read([FromQuery] GenericPaginatedRequest request)
        {
            var entities = await DefaultRepository.Read(request.Count, request.Offset);

            var response = new ApiResponse<IEnumerable<TModel>>(entities);

            return Ok(response);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Update([FromBody] TModel entity)
        {
            await DefaultRepository.Update(entity);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Delete([FromBody] GenericIdRequest request)
        {
            await DefaultRepository.DeleteById(request.Id ?? 0);
            await DefaultRepository.Save();

            var response = new ApiResponse();

            return Ok(response);
        }
    }
}
