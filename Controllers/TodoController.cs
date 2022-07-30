using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace IDO.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : Controller
{
    private readonly ILogger<LoginController> _logger;
    private readonly IConfiguration _configuration;

    public TodoController(ILogger<LoginController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    // [HttpGet]
    // public void get()
    // {
    //     return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    //     {
    //         Date = DateTime.Now.AddDays(index),
    //         TemperatureC = Random.Shared.Next(-20, 55),
    //         Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    //     })
    //     .ToArray();
    // }

    [HttpPost]
    public void Post([FromBody] ToDo todoInfo)
    {
        string jsonResponse = "{\"success\":false}";
        if (ModelState.IsValid)
        {

            string sqlDataSource = this._configuration.GetConnectionString("IDOCon");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                string query = "INSERT INTO dbo.Todo (id)";
                query += "Values(@id);";
                SqlCommand myCommand = new SqlCommand(query, myCon);
                myCommand.Parameters.AddWithValue("@id", todoInfo.id);
                myCommand.ExecuteNonQuery();
                myCon.Close();
            }
            jsonResponse = "{\"success\":true}";
        }

        Response.Clear();
        Response.ContentType = "application/json; charset=utf-8";
        Response.StatusCode = 200;
        Response.WriteAsync(jsonResponse);

        return;
    }
}
