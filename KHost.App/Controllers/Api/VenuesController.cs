using KHost.App.Models;
using KHost.App.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class VenuesController : CrudController<Venue, IVenuesRepository>
    {
        public VenuesController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }
    }
}
