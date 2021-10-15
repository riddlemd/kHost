using KHost.App.Repositories;
using Microsoft.AspNetCore.Mvc;

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
