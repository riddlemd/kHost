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
    public class SongsControllerTests : CrudControllerTests<Song, ISongsRepository, SongsController>
    {
        protected override SongsController CreateController(ISongsRepository repository) => new(repository);

        protected override IEnumerable<Song> GenerateEntities() => new List<Song>
        {
            new ()
            {
                Id = 1,
                Name = "Dragula",
                BandName = "Rob Zombie"
            },
            new ()
            {
                Id = 2,
                Name = "Island in the Sun",
                BandName = "Weezer"
            },
            new ()
            {
                Id = 3,
                Name = "Closing Time",
                BandName = "Semisonic"
            },
            new ()
            {
                Id = 4,
                Name = "One Headlight",
                BandName = "The Wallflowers"
            },
            new ()
            {
                Id = 5,
                Name = "Bad Reputation",
                BandName = "Joan Jett & The Blackhearts"
            },
        };

        protected override Song CreateSampleEntity() => new()
        {
            Name = "Dream Weaver",
            BandName = "Gary Wright"
        };
    }
}
