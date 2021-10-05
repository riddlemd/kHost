using Pluralize.NET.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KHost.Common.Text
{
    public static class StringExtensions
    {
        private static Pluralizer Pluralizer { get; } = new Pluralizer();

        public static string Pluralize(this string input) => Pluralizer.Pluralize(input);

        public static string Singularize(this string input) => Pluralizer.Singularize(input);
    }
}
