using System;

namespace KHost.Common.Models
{
    public abstract class BaseModel : ICloneable
    {
        public virtual object Clone() => MemberwiseClone();
    }
}
