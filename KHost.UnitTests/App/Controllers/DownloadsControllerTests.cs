using KHost.Abstractions.Models;
using KHost.Abstractions.Repositories;
using KHost.App.Areas.Api.Controllers;
using System;
using System.Collections.Generic;

namespace KHost.UnitTests.App.Controllers
{
    public class DownloadsControllerTests : CrudControllerTests<Download, IDownloadsRepository, DownloadsController>
    {
        protected override DownloadsController CreateController(IDownloadsRepository repository) => new(repository);

        protected override IEnumerable<Download> GenerateEntities() => new List<Download>
        {
            new ()
            {
                Id = 1,
                Name = "Christmas Song - Johnny Cash",
                SongId = 1,
                Progress = 10
            },
            new ()
            {
                Id = 2,
                Name = "Highway To the Danger Zone - Kenny Logins",
                SongId = 2,
                Progress = 50
            }
        };

        protected override Download CreateSampleEntity() => new()
        {
            Name = "Test Download",
            Progress = Random.Next(0, 100),
            SongId = Random.Next(1, 1000)
        };
    }
}
