﻿using Pluralize.NET.Core;

namespace KHost.Common.Text
{
    public static class StringExtensions
    {
        private static Pluralizer Pluralizer { get; } = new Pluralizer();

        public static string Pluralize(this string input) => Pluralizer.Pluralize(input);

        public static string Singularize(this string input) => Pluralizer.Singularize(input);
    }
}
