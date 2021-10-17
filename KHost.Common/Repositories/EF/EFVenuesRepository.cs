using KHost.Common.Models;

namespace KHost.Common.Repositories.EF
{
    public class EFVenuesRepository : BaseEFRepository<Venue>, IVenuesRepository
    {
        public EFVenuesRepository(DatabaseContext context) : base(context)
        {

        }
    }
}
