﻿using KHost.Abstractions.SongSearchEngines;
using KHost.App.SongSearchEngines;
using Microsoft.Extensions.DependencyInjection;
using Xunit;
using Xunit.Categories;

namespace KHost.UnitTests.App.SongSearchEngines
{
    public class IServiceCollectionExtensionsTest
    {

        [Fact]
        [Category(TestCategory.HappyPath)]
        public void ShouldAddSearchEnginesFoundInAssymbliesToServiceCollection()
        {
            // Given
            var services = new ServiceCollection();

            var type = typeof(ISongSearchEngine);

            // When
            services.AddSearchEnginesDynamically();

            // Then
            Assert.Contains(services, d => d.ServiceType == type);
        }
    }
}