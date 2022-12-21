using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;

namespace KHost.Server.Controllers
{
    public class DownloadsController : CrudController<Download, IDownloadsRepository>
    {
        public DownloadsController(IDownloadsRepository defaultRepository) : base(defaultRepository)
        {
        }
    }
}
