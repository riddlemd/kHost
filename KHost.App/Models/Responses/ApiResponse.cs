using KHost.Common.Text;
using System;
using System.Collections;
using System.Linq;
using System.Runtime.Serialization;

namespace KHost.App.Models.Responses
{
    [Serializable]
    public class ApiResponse : ISerializable
    {
        public bool Success { get; set; } = true;

        public virtual void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            foreach (var property in GetType().GetProperties())
            {
                var shouldBeIgnored = property.GetCustomAttributes(true).Any(a => a is IgnoreDataMemberAttribute);

                if (shouldBeIgnored) continue;

                var camelizedKey = property.Name[0].ToString().ToLower() + property.Name[1..];
                info.AddValue(camelizedKey, property.GetValue(this));
            }
        }
    }

    [Serializable]
    public class ApiResponse<TModel> : ApiResponse
        where TModel : class
    {
        [IgnoreDataMember]
        public TModel Object { get; }

        private readonly string _objectName;

        public ApiResponse(TModel obj)
        {
            _objectName = GetPropertyNameFromObject(obj);
            Object = obj;
        }

        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            if(Object != null)
            {
                info.AddValue(_objectName, Object);
            }

            base.GetObjectData(info, context);
        }

        #region Static

        private static string GetPropertyNameFromObject(object obj)
        {
            if (obj is IEnumerable objs)
            {
                var objsType = objs.GetType();
                var name = objsType.GetElementType()?.Name.Pluralize() ?? objsType.GetGenericArguments().LastOrDefault()?.Name.Pluralize();
                return name[0].ToString().ToLower() + name[1..];
            }

            return obj.GetType().Name;
        }

        #endregion
    }
}
