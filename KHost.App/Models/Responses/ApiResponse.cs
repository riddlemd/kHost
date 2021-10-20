using KHost.Common.Text;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
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
                var camelizedKey = property.Name[0].ToString().ToLower() + property.Name[1..];
                info.AddValue(camelizedKey, property.GetValue(this));
            }
        }
    }

    [Serializable]
    public class ApiResponse<TModel> : ApiResponse
        where TModel : class
    {
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

                return objsType.GetElementType()?.Name.Pluralize() ?? objsType.GetGenericArguments().LastOrDefault()?.Name.Pluralize();
            }

            return obj.GetType().Name;
        }

        #endregion
    }
}
