using Microsoft.AspNetCore.Mvc;

namespace KHost.App.Areas.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Area("Api")]
    public abstract class BaseApiController : ControllerBase
    {
        
    }
}
