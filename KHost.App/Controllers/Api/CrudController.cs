﻿using KHost.App.Models;
using KHost.App.Models.Requests;
using KHost.App.Models.Responses;
using KHost.App.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public abstract class CrudController<TModel, TRepository> : BaseApiController
        where TModel : class, IModelWithId
        where TRepository : class, IRepository<TModel>
    {
        private TRepository DefaultRepository { get; }

        public CrudController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            DefaultRepository = UnitOfWork.GetRepository<TRepository>();
        }

        [HttpPost]
        public virtual async Task<IActionResult> Create([FromBody] TModel entity)
        {
            await DefaultRepository.Create(entity);
            await DefaultRepository.Save();

            var response = new ApiResponse(entity);

            return Ok(response);
        }

        [HttpGet]
        public virtual async Task<IActionResult> Read([FromQuery] GenericPaginatedRequest request)
        {
            var queuedSingers = await DefaultRepository.Read(request.Count, request.Offset);

            var response = new ApiResponse(queuedSingers);

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
        public virtual async Task<IActionResult> Delete([FromBody] int id)
        {
            await DefaultRepository.DeleteById(id);

            var response = new ApiResponse();

            return Ok(response);
        }
    }
}
