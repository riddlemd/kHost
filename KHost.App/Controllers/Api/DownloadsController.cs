using KHost.Common.Models;
using KHost.Common.Repositories;

namespace KHost.App.Controllers.Api
{
    public class DownloadsController : CrudController<Download, IDownloadsRepository>
    {
        public DownloadsController(IDownloadsRepository defaultRepository) : base(defaultRepository)
        {
        }
    }
}
