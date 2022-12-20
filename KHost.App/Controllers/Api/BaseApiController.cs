using Microsoft.AspNetCore.Mvc;

namespace KHost.App.Controllers.Api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {
        public BaseApiController()
        {

        }
    }
}
