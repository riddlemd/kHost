using System.Collections.Generic;

namespace KHost.Common.Collections
{
    public static class IListExtensions
    {
        public static IList<T> Move<T>(this IList<T> list, int oldIndex, int newIndex)
        {
            if (oldIndex == newIndex) return list;

            T item = list[oldIndex];
            list.RemoveAt(oldIndex);
            list.Insert(newIndex, item);

            return list;
        }

        public static IList<T> MoveTowardsFirst<T>(this IList<T> list, int oldIndex) => list.Move(oldIndex, oldIndex - 1);

        public static IList<T> MoveTowardsLast<T>(this IList<T> list, int oldIndex) => list.Move(oldIndex, oldIndex + 1);

        public static IList<T> MoveToFirst<T>(this IList<T> list, int oldIndex)
        {
            if (oldIndex == 0)
                return list;

            list.Move(oldIndex, 0);

            return list;
        }

        public static IList<T> MoveToLast<T>(this IList<T> list, int oldIndex)
        {
            var newIndex = list.Count - 1;

            if (oldIndex == newIndex)
                return list;

            list.Move(oldIndex, newIndex);

            return list;
        }
    }
}
