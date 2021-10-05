using Dapper.Contrib.Extensions;
using KHost.Common.Text;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Models
{
    public class Singer : BaseModel
    {
        public string Name { get; set; }

        [Computed]
        public string NickName { get; set; }
    }
}
