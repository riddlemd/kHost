using KHost.App.Controllers.Api;
using KHost.Common.Models;
using KHost.Common.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Khost.App.UnitTests.Tests.Controllers
{
    public class SingersControllerTests : CrudControllerTests<Singer, ISingersRepository, SingersController>
    {
        protected override SingersController CreateController() => new (Repository);

        protected override IEnumerable<Singer> GenerateEntities() => new List<Singer>
        {
            new ()
            {
                Id = 1,
                Name = "John Doe"
            },
            new ()
            {
                Id = 2,
                Name = "David Bowie"
            },
            new ()
            {
                Id = 3,
                Name = "Joe Dirt"
            },
            new ()
            {
                Id = 4,
                Name = "Fredric Cougar"
            },
            new ()
            {
                Id = 5,
                Name = "Richard Van Dike"
            },
        };

        protected override Singer CreateSampleEntity() => new ()
        {
            Name = "Guy Faux",
        };
    }
}
