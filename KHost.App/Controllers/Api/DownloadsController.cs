using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;

namespace KHost.App.Controllers.Api
{
    public class DownloadsController : CrudController<Download, IDownloadsRepository>
    {
        public DownloadsController(IDownloadsRepository defaultRepository) : base(defaultRepository)
        {
        }
    }
}
