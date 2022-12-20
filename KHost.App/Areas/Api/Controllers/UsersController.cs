using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using KHost.Abstractions.Repositories;
using KHost.Abstractions.Models;
using KHost.App.Areas.Api.Models.Responses;

namespace KHost.App.Areas.Api.Controllers
{
    public class UsersController : CrudController<User, IUsersRepository>
    {
        public UsersController(IUsersRepository defaultRepository) : base(defaultRepository)
        {

        }

        [HttpPost]
        public Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var accessKey = Guid.NewGuid().ToString();

            var response = new ApiResponse<User>(new User()
            {
                Username = loginRequest.Username,
                AccessKey = accessKey
            });

            return Task.FromResult<IActionResult>(Ok(response));
        }

        #region Requests

        public class LoginRequest
        {
            public string Username { get; set; } = "";

            public string Password { get; set; } = "";
        }

        #endregion
    }
}
