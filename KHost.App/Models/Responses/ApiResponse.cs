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
    public class ApiResponse : DynamicObject, ISerializable
    {
        private IDictionary<string, object> Properties { get; } = new Dictionary<string, object>();

        public bool Success { get; set; } = true;

        public ApiResponse()
        {

        }

        public ApiResponse(object obj)
        {
            Properties.Add(GetPropertyNameFromObject(obj), obj);
        }

        private string GetPropertyNameFromObject(object obj)
        {
            if (obj is IEnumerable objs)
            {
                var objsType = objs.GetType();

                return objsType.GetElementType()?.Name.Pluralize() ?? objsType.GetGenericArguments().LastOrDefault()?.Name.Pluralize();
            }

            return obj.GetType().Name;
        }

        public void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            // Get dynamic properties
            foreach(var kv in Properties)
            {
                var camelizedKey = kv.Key[0].ToString().ToLower() + kv.Key[1..];
                info.AddValue(camelizedKey, kv.Value);
            }

            // Get standard class properties
            foreach(var property in GetType().GetProperties())
            {
                var camelizedKey = property.Name[0].ToString().ToLower() + property.Name[1..];
                info.AddValue(camelizedKey, property.GetValue(this));
            }
        }

        #region Dynamic Object Overrides

        public override bool TryGetMember(GetMemberBinder binder, out object result) => Properties.TryGetValue(binder.Name, out result);

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            Properties[binder.Name] = value;
            return true;
        }

        #endregion
    }
}
