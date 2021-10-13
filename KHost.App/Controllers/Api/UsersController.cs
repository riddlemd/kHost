using KHost.App.Models;
using KHost.App.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class UsersController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var accessKey = Guid.NewGuid().ToString();

            var response = new ApiResponse(new User()
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
