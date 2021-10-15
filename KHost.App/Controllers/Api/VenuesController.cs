using KHost.Common.Models;
using KHost.Common.Repositories;

namespace KHost.App.Controllers.Api
{
    public class VenuesController : CrudController<Venue, IVenuesRepository>
    {
        public VenuesController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }
    }
}
