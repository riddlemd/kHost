using System.Collections.Generic;

namespace KHost.Common.Collections
{
    public static class IListExtensions
    {
        public static void Move<T>(this IList<T> list, int oldIndex, int newIndex)
        {
            if (oldIndex == newIndex)
                return;

            T item = list[oldIndex];
            list.RemoveAt(oldIndex);
            list.Insert(newIndex, item);
        }

        public static void MoveToFirst<T>(this IList<T> list, int oldIndex)
        {
            if (oldIndex == 0)
                return;

            list.Move(oldIndex, 0);
        }

        public static void MoveToLast<T>(this IList<T> list, int oldIndex)
        {
            var newIndex = list.Count - 1;

            if (oldIndex == newIndex)
                return;

            list.Move(oldIndex, newIndex);
        }
    }
}
