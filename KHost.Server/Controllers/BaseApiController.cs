using Microsoft.AspNetCore.Mvc;

namespace KHost.Server.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {

    }
}
