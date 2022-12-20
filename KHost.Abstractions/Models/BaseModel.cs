using System;

namespace KHost.Abstractions.Models
{
    public abstract class BaseModel : ICloneable
    {
        public virtual object Clone() => MemberwiseClone();
    }
}
