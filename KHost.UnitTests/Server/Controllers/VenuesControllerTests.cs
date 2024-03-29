﻿using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.Server.Controllers;

namespace KHost.UnitTests.Server.Controllers
{
    public class VenuesControllerTests : CrudControllerTests<Venue, IVenuesRepository, VenuesController>
    {
        protected override VenuesController CreateController(IVenuesRepository repository) => new(repository);

        protected override IEnumerable<Venue> GenerateEntities() => new List<Venue>
        {
            new ()
            {
                Id = 1,
                Name = "Cain's"
            },
            new ()
            {
                Id = 2,
                Name = "The Hive"
            },
            new ()
            {
                Id = 3,
                Name = "Rabbit Hole"
            },
            new ()
            {
                Id = 4,
                Name = "The Warehouse"
            },
            new ()
            {
                Id = 5,
                Name = "Lot 6"
            },
        };

        protected override Venue CreateSampleEntity() => new()
        {
            Name = "Vanguard"
        };
    }
}
