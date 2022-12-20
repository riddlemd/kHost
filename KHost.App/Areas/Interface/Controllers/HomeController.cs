using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace KHost.App.Areas.Interface.Controllers
{
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index()
        {
            return View();
        }
    }
}
