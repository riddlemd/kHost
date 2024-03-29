﻿using KHost.Common.Collections.Generic;
using KHost.UnitTests;
using Xunit;
using Xunit.Categories;

namespace KHost.UnitTests.Common.Collections
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
        [Category(TestCategory.HappyPath)]
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
        [Category(TestCategory.HappyPath)]
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
        [Category(TestCategory.HappyPath)]
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
