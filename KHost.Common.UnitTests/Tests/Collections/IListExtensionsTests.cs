using KHost.Common.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Categories;

namespace KHost.Common.UnitTests.Tests.Collections
{
    public class IListExtensionsTests
    {
        private List<string> CreateListOfStrings() => new()
        {
            "John",
            "David",
            "Eric",
            "Matt",
            "Michael"
        };

        [Fact]
        [Category(TestCategory.Success)]
        public void ShouldMoveWhenProvidedOldIndexAndNewIndex()
        {
            // Given
            var list = CreateListOfStrings();

            var name = "Matt";

            var oldIndex = list.IndexOf(name);

            var newIndex = 2;

            // When
            list.Move(oldIndex, newIndex);

            // Then
            Assert.True(list[newIndex] == name);
        }

        [Fact]
        [Category(TestCategory.Success)]
        public void ShouldMoveToFirstWhenProvidedOldIndex()
        {
            // Given
            var list = CreateListOfStrings();

            var name = "Matt";

            var oldIndex = list.IndexOf(name);

            // When
            list.MoveToFirst(oldIndex);

            // Then
            Assert.True(list.First() == name);
        }

        [Fact]
        [Category(TestCategory.Success)]
        public void ShouldMoveToLastWhenProvidedOldIndex()
        {
            // Given
            var list = CreateListOfStrings();

            var name = "Matt";

            var oldIndex = list.IndexOf(name);

            // When
            list.MoveToLast(oldIndex);

            // Then
            Assert.True(list.Last() == name);
        }
    }
}
