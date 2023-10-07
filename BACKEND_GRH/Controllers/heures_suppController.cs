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
    public class heures_suppController : ApiController
    {
        [Route("hs/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Get(int exercice)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "heures_supp_select_all";
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Connection = myConnection;
            List<Pret> prets = new List<Pret>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        [Route("hs/add/{exercice}")]
        [HttpPost]
        public IHttpActionResult add([FromBody] heures_supp h,int exercice)
        {
            try
            {

                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "heures_supp_insert";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@date", h.date);
                sqlCmd.Parameters.AddWithValue("@hs1_25", h.hs1_25);
                sqlCmd.Parameters.AddWithValue("@hs1_4", h.hs1_4);
                sqlCmd.Parameters.AddWithValue("@hs1_5", h.hs1_5);
                sqlCmd.Parameters.AddWithValue("@hs1_75", h.hs1_75);
                sqlCmd.Parameters.AddWithValue("@hs2", h.hs2);
                sqlCmd.Parameters.AddWithValue("@hs_nuit", h.hs_nuit);
                sqlCmd.Parameters.AddWithValue("@taux_hs", h.tauxhs);
                sqlCmd.Parameters.AddWithValue("@exercice", exercice);
                sqlCmd.Parameters.AddWithValue("@matricule_employe", h.matricule);

                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("hs/update/{id}")]
        [HttpPut]
        public IHttpActionResult update([FromBody] heures_supp h, int id)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "heures_supp_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@date", h.date);
                sqlCmd.Parameters.AddWithValue("@hs1_25", h.hs1_25);
                sqlCmd.Parameters.AddWithValue("@hs1_4", h.hs1_4);
                sqlCmd.Parameters.AddWithValue("@hs1_5", h.hs1_5);
                sqlCmd.Parameters.AddWithValue("@hs1_75", h.hs1_75);
                sqlCmd.Parameters.AddWithValue("@hs2", h.hs2);
                sqlCmd.Parameters.AddWithValue("@hs_nuit", h.hs_nuit);
                sqlCmd.Parameters.AddWithValue("@taux_hs", h.tauxhs);
                sqlCmd.Parameters.AddWithValue("@id", id);
                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("hs/delete/{id}")]
        [HttpDelete]
        public IHttpActionResult delete(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "heures_supp_delete";
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

    }
}
