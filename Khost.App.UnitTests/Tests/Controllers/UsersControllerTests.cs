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
    public class UsersControllerTests : CrudControllerTests<User, IUsersRepository, UsersController>
    {
        protected override UsersController CreateController(IUsersRepository repository) => new(repository);

        protected override IEnumerable<User> GenerateEntities() => new List<User>
        {
            new ()
            {
                Id = 1,
                Username = "roger"
            },
            new ()
            {
                Id = 2,
                Username = "steve"
            },
            new ()
            {
                Id = 3,
                Username = "eric"
            },
            new ()
            {
                Id = 4,
                Username = "bill"
            },
            new ()
            {
                Id = 5,
                Username = "sami"
            },
        };

        protected override User CreateSampleEntity() => new()
        {
            Username = "Bowser"
        };
    }
}
