﻿using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace IDO.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : Controller
{
    private readonly ILogger<LoginController> _logger;
    private readonly IConfiguration _configuration;

    public LoginController(ILogger<LoginController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    //@TODO respond if user entered valid email, valid password, valid email and password
    //@TODO remove console.log and console.writeline
    [HttpPost]
    public void login([FromBody] LoginForm accountInfo)
    {
        string jsonResponse = "{\"success\":false}";
        if (ModelState.IsValid)
        {
            Boolean ValidEmail = false;

            string sqlDataSource = this._configuration.GetConnectionString("IDOCon");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                string query = "SELECT AccountMail from dbo.Account";
                SqlCommand myCommand = new SqlCommand(query, myCon);
                SqlDataReader myReader = myCommand.ExecuteReader();
                string Email = "";
                while (myReader.Read())
                {
                    Email = String.Format("{0}", myReader[0]);
                    if (String.Equals(accountInfo.email, Email))
                    {
                        ValidEmail = true;
                    }
                }
                myReader.Close();
                myCon.Close();
            }

            if (ValidEmail)
            {
                Response.Cookies.Append("ido-login", "true", new CookieOptions
                {
                    Secure = true,
                    HttpOnly = true,
                    SameSite = SameSiteMode.None
                });

                jsonResponse = "{\"success\":true}";
            }
        }

        Response.Clear();
        Response.ContentType = "application/json; charset=utf-8";
        Response.StatusCode = 200;
        Response.WriteAsync(jsonResponse);

        return;
    }
}