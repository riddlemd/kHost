using System;

namespace KHost.Common.Models
{
    public abstract class BaseModel : ICloneable
    {
        public virtual object Clone() => MemberwiseClone();

        public virtual T Clone<T>() where T : class => Clone() as T;
    }
}
