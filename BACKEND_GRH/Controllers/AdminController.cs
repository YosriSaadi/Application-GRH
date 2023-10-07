using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BACKEND_GRH.Models;
namespace BACKEND_GRH.Controllers
{
    public class AdminController : ApiController
    {
       
         private Admin Admin= new Admin();
        private User user = new User();
        [Route("api/admin/{username}/{password}")]
        [HttpGet]
        public Admin Getadmin(String username,string password)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "CHECKadmin";
            sqlCmd.Parameters.AddWithValue("@username", username);
            sqlCmd.Parameters.AddWithValue("@password", password);

            sqlCmd.Connection = myConnection;

            try
                {

                myConnection.Open();
                SqlDataReader dr = sqlCmd.ExecuteReader();
                var a = new Admin();

                while (dr.Read())
                    {

                        a.id = Convert.ToInt32(dr["id"].ToString());
                        a.username = dr["username"].ToString();
                        a.password = dr["password"].ToString();
                        a.nom= dr["nom"].ToString();
                        a.prenom = dr["prenom"].ToString();


                }
                    dr.Close();
                return a;
                }
                catch (Exception)
                {
                    throw;
                }

        }




        [Route("user/{username}/{password}")]
        [HttpGet]
        public User Getuser(String username, string password)
        {
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "user_select";
            sqlCmd.Parameters.AddWithValue("@username", username);
            sqlCmd.Parameters.AddWithValue("@password", password);
            sqlCmd.Connection = myConnection;

            try
            {

                myConnection.Open();
                SqlDataReader dr = sqlCmd.ExecuteReader();
                var u = new User();

                while (dr.Read())
                {

                    u.id = Convert.ToInt32(dr["id"].ToString());
                    u.username = dr["username"].ToString();
                    u.password = dr["password"].ToString();
                    u.role = dr["role"].ToString();
                    u.societe_id= (int)Convert.ToInt64(dr["societe_id"]);
                    u.prenom = dr["prenom"].ToString();
                    u.nom = dr["nom"].ToString();

                }
                dr.Close();
                return u;
            }
            catch (Exception)
            {
                throw;
            }

        }


        [Route("adduser")]
        [HttpPost]
        public IHttpActionResult add([FromBody] User u)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "add_user";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@username", u.username);
                sqlCmd.Parameters.AddWithValue("@password", u.password);
                sqlCmd.Parameters.AddWithValue("@nom", u.nom);
                sqlCmd.Parameters.AddWithValue("@prenom", u.prenom);
                sqlCmd.Parameters.AddWithValue("@role", u.role);
                sqlCmd.Parameters.AddWithValue("@nomsociete", u.nomsociete);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("utilisateurs")]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "allusers";
            sqlCmd.Connection = myConnection;
            List<User> users = new List<User>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }



        [Route("deleteuser/{id}")]
        [HttpDelete]
        public IHttpActionResult deleteuserbyidid(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "deleteuserbyid";
            sqlCmd.Parameters.AddWithValue("@id", id);
            sqlCmd.Connection = myConnection;
            try { 
                myConnection.Open();
                sqlCmd.ExecuteNonQuery();
        }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
              }

            return Ok();

         }


        [Route("update/user/{id}")]
        [HttpPut]
        public IHttpActionResult updateuserdata([FromBody] User s, int id)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "user_editby_id";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@nom", s.nom);
                sqlCmd.Parameters.AddWithValue("@prenom", s.prenom);
                sqlCmd.Parameters.AddWithValue("@username", s.username);
                sqlCmd.Parameters.AddWithValue("@password", s.password);
                sqlCmd.Parameters.AddWithValue("@role", s.role);
                sqlCmd.Parameters.AddWithValue("@nomsociete",s.nomsociete);
                sqlCmd.Parameters.AddWithValue("@id", id);
                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }


    }

}
