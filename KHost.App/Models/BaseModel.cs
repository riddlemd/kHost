using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models
{
    public abstract class BaseModel : ICloneable
    {
        public virtual object Clone() => MemberwiseClone();

        public virtual T Clone<T>() where T : class => Clone() as T;
    }
}
