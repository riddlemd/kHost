using KHost.App.Models;
using KHost.App.Providers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class SingersController : BaseApiController
    {
        protected SingersProvider DefaultProvider { get; }

        public SingersController(SingersProvider defaultProvider)
        {
            DefaultProvider = defaultProvider;
        }

        [HttpGet]
        public virtual async Task<IActionResult> GetAll()
        {
            var singers = await DefaultProvider.GetAll();

            var response = new OkObjectResult(new
            {
                Singers = singers
            });

            return response;
        }

        [HttpGet]
        public virtual async Task<IActionResult> Search([FromQuery] string q)
        {
            var singers = await DefaultProvider.Search(q);

            var response = new OkObjectResult(new
            {
                Singers = singers
            });

            return response;
        }

        [HttpPost]
        public virtual async Task<IActionResult> Save(Singer model)
        {
            var result = await DefaultProvider.Save(model);

            var response = new OkObjectResult(result);

            return response;
        }

        [HttpPost]
        public virtual async Task<IActionResult> Remove(int id)
        {
            var result = await DefaultProvider.Remove(id);

            var response = new OkObjectResult(result);

            return response;
        }
    }
}
