using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BACKEND_GRH.Models;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
namespace BACKEND_GRH.Controllers
{
    public class CalendrierController : ApiController
    {
        [Route("calendrier/{shift}")]
        [HttpGet]
        public object getCalendrier(string shift)
        {
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Calendrier_Liste";
            sqlCmd.Parameters.AddWithValue("@shift", shift);
            sqlCmd.Connection = myConnection;

            try
            {
                myConnection.Open();
                SqlDataReader dr = sqlCmd.ExecuteReader();
                List<Calendrier> Calendriers = new List<Calendrier>();
                while (dr.Read())
                {
                    var e = new Calendrier();
                    e.id = (int)Convert.ToInt64(dr["id"].ToString());
                    e.title = dr["nom"].ToString();
                    switch (dr["type"].ToString())
                    {
                        case "jour chomé non payé":
                            e.className = "bg-danger";
                            break;
                        case "jour chomé payé":
                            e.className = "bg-warning";
                            break;
                        default:
                            e.className = "bg-success";
                            break;
                    }
                    e.start = dr["date"].ToString();
                    e.id_shift = (int)Convert.ToInt64(dr["id_shift"].ToString());
                    Calendriers.Add(e);
                }
                dr.Close();
                return Json(Calendriers);
            }
            catch (Exception)
            {
                throw;
            }


        }

        [Route("calendrier/add")]
        [HttpPost]
        public IHttpActionResult add([FromBody] Calendrier c)
        {
            try
            {
                string lib;
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Calendrier_insert";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                switch (c.className)
                {
                    case "bg-danger":
                        lib = "jour chomé non payé";
                        break;
                    case "bg-warning":
                        lib = "jour chomé payé";
                        break;
                    default:
                        lib = "Repos Hebdomadaire";
                        break;
                }

                sqlCmd.Parameters.AddWithValue("@nom", c.title);
                sqlCmd.Parameters.AddWithValue("@date", c.start);
                sqlCmd.Parameters.AddWithValue("@type", lib);
                sqlCmd.Parameters.AddWithValue("@id_shift", c.id_shift);
               


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("calendrier/delete/{id}")]
        [HttpDelete]
        public IHttpActionResult delete(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Calendrier_delete";
            sqlCmd.Parameters.AddWithValue("@id", id);
            sqlCmd.Connection = myConnection;
            try
            {
                myConnection.Open();
                sqlCmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();

        }

        [Route("calendrier/update/{id}")]
        [HttpPut]
        public IHttpActionResult update([FromBody] Calendrier c, int id)
        {
            string lib;
            try
            {
                
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Calendrier_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                switch (c.className)
                {
                    case "bg-danger":
                        lib = "jour chomé non payé";
                        break;
                    case "bg-warning":
                        lib = "jour chomé payé";
                        break;
                    default:
                        lib = "Repos Hebdomadaire";
                        break;
                }
                sqlCmd.Parameters.AddWithValue("@nom", c.title);
                sqlCmd.Parameters.AddWithValue("@type", lib);
                sqlCmd.Parameters.AddWithValue("@id", id);
                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }
        [Route("planning/verification/{date}/{matricule}")]
        [HttpGet]
        public HttpResponseMessage check_cloture(string date, string matricule)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Calendrier_jour_ferier_existe";
            sqlCmd.Parameters.AddWithValue("@date", date);
            sqlCmd.Parameters.AddWithValue("@matricule", matricule);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


    }
}
