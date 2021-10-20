using KHost.Common.Models;
using KHost.App.Models.Responses;
using KHost.Common.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class UsersController : CrudController<User, IUsersRepository>
    {
        public UsersController(IUsersRepository defaultRepository) : base(defaultRepository)
        {

        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var accessKey = Guid.NewGuid().ToString();

            var response = new ApiResponse<User>(new User()
            {
                Username = loginRequest.Username,
                AccessKey = accessKey
            });

            return Ok(response);
        }

        #region Requests

        public class LoginRequest
        {
            public string Username { get; set; }

            public string Password { get; set; }
        }

        #endregion
    }
}
