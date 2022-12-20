using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;

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
            await DefaultRepository.CreateAsync(entity);
            await DefaultRepository.SaveAsync();

            var response = new ApiResponse<TModel>(entity);

            return Ok(response);
        }

        [HttpGet]
        public virtual async Task<IActionResult> Fetch([FromQuery] GenericPaginatedRequest request)
        {
            var entities = await DefaultRepository.FetchAsync(request.Count, request.Offset);

            var response = new ApiResponse<IEnumerable<TModel>>(entities);

            return Ok(response);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Update([FromBody] TModel entity)
        {
            await DefaultRepository.UpdateAsync(entity);
            await DefaultRepository.SaveAsync();

            var response = new ApiResponse();

            return Ok(response);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Delete([FromBody] GenericIdRequest request)
        {
            await DefaultRepository.DeleteByIdAsync(request.Id ?? 0);
            await DefaultRepository.SaveAsync();

            var response = new ApiResponse();

            return Ok(response);
        }
    }
}
