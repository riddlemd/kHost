using KHost.App.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {
        protected IUnitOfWork UnitOfWork { get; }

        public BaseApiController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
        }
    }
}
