using KHost.App.Models;
using KHost.App.Models.Responses;
using KHost.App.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace KHost.App.Controllers.Api
{
    public class UsersController : BaseApiController
    {
        public UsersController(IUnitOfWork unitOfWork) : base(unitOfWork)
        {

        }

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
