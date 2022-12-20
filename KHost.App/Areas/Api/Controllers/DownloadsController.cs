using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;

namespace KHost.App.Areas.Api.Controllers
{
    public class DownloadsController : CrudController<Download, IDownloadsRepository>
    {
        public DownloadsController(IDownloadsRepository defaultRepository) : base(defaultRepository)
        {
        }
    }
}
