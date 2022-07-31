using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Newtonsoft.Json.Linq;

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

    [HttpGet]
    public void get()
    {
        Response.ContentType = "application/json; charset=utf-8";
        Response.StatusCode = 200;
        string? value = Request.Cookies["ido-login"];
        if (value != null && value != "")
        {
            string decodedValue = TodoController.Base64Decode(value);
            JObject json = JObject.Parse(decodedValue);
            if (json != null && json["userEmail"] != null)
            {
                string jsonResponse = "";
                List<string> fetchedData = new List<string>();
                string sqlDataSource = this._configuration.GetConnectionString("IDOCon");
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    string query = "SELECT * from dbo.Tasks WHERE userCredential='" + json["userEmail"]?.ToString() + "'";
                    SqlCommand myCommand = new SqlCommand(query, myCon);
                    SqlDataReader myReader = myCommand.ExecuteReader();
                    while (myReader.Read())
                    {
                        jsonResponse = "{\"id\":\"" + String.Format("{0}", myReader[0]) + "\", ";
                        jsonResponse += "\"title\":\"" + String.Format("{0}", myReader[1]) + "\", ";
                        jsonResponse += "\"category\":\"" + String.Format("{0}", myReader[2]) + "\", ";
                        jsonResponse += "\"dueDate\":\"" + String.Format("{0}", myReader[3]) + "\", ";
                        jsonResponse += "\"estimate\":\"" + String.Format("{0}", myReader[4]) + "\", ";
                        jsonResponse += "\"importance\":\"" + String.Format("{0}", myReader[5]) + "\", ";
                        jsonResponse += "\"userCredential\":\"" + String.Format("{0}", myReader[6]) + "\", ";
                        jsonResponse += "\"status\":\"" + String.Format("{0}", myReader[7]) + "\"}";
                        fetchedData.Add(jsonResponse);
                    }
                    myReader.Close();
                    myCon.Close();
                }
                Response.WriteAsync("[" + String.Join(", ", fetchedData.ToArray()) + "]");
                return;
            }
        }
        Response.WriteAsync("{\"success\":false}");
    }

    [HttpPost]
    public void Post([FromBody] ToDo todoInfo)
    {
        string jsonResponse = "{\"success\":false}";
        if (ModelState.IsValid)
        {
            string? value = Request.Cookies["ido-login"];
            if (value != null && value != "")
            {
                string decodedValue = TodoController.Base64Decode(value);
                JObject json = JObject.Parse(decodedValue);
                if (json != null && json["userEmail"] != null)
                {
                    string sqlDataSource = this._configuration.GetConnectionString("IDOCon");
                    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                    {
                        myCon.Open();
                        string query = "if exists(SELECT * from dbo.Tasks where id='" + todoInfo.id + "')";
                        query += " BEGIN update dbo.Tasks set ";
                        query += "title='" + todoInfo.title + "', ";
                        query += "category='" + todoInfo.category + "', ";
                        query += "dueDate='" + todoInfo.dueDate + "', ";
                        query += "estimate='" + todoInfo.estimate + "', ";
                        query += "importance='" + todoInfo.importance + "', ";
                        query += "userCredential='" + json["userEmail"] + "', ";
                        query += "status='" + todoInfo.status + "' ";
                        query += "End else begin insert INTO dbo.Tasks (id, title, category, dueDate, estimate, importance, userCredential, status) Values(@id, @title, @category, @dueDate, @estimate, @importance, @userCredential, @status)";
                        query += " end";
                        SqlCommand myCommand = new SqlCommand(query, myCon);
                        myCommand.Parameters.AddWithValue("@id", todoInfo.id);
                        myCommand.Parameters.AddWithValue("@title", todoInfo.title);
                        myCommand.Parameters.AddWithValue("@category", todoInfo.category);
                        myCommand.Parameters.AddWithValue("@dueDate", todoInfo.dueDate);
                        myCommand.Parameters.AddWithValue("@estimate", todoInfo.estimate);
                        myCommand.Parameters.AddWithValue("@importance", todoInfo.importance);
                        myCommand.Parameters.AddWithValue("@userCredential", json["userEmail"]?.ToString());
                        myCommand.Parameters.AddWithValue("@status", todoInfo.status);
                        myCommand.ExecuteNonQuery();
                        myCon.Close();
                    }
                    jsonResponse = "{\"success\":true}";
                }
            }
        }
        Response.ContentType = "application/json; charset=utf-8";
        Response.StatusCode = 200;
        Response.WriteAsync(jsonResponse);

        return;
    }

    public static string Base64Decode(string base64EncodedData)
    {
        var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
        return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
    }
}
