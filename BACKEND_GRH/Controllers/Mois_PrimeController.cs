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
    public class Mois_PrimeController : ApiController
    {
        [Route("mois")]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Mois_all";
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("mois/add/{id}")]
        [HttpPost]
        public IHttpActionResult addMois([FromBody] Mois m,int id)
        {
            try
            {
            
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Mois_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@ordre", m.ordre);
                sqlCmd.Parameters.AddWithValue("@designation", m.designation);
                sqlCmd.Parameters.AddWithValue("@cloture", m.cloture);
                sqlCmd.Parameters.AddWithValue("@base_calcul", m.base_calcul);
                sqlCmd.Parameters.AddWithValue("@taux_assiduite", m.taux_assiduite);
                sqlCmd.Parameters.AddWithValue("@assurance_groupe", m.assurance_groupe);
                sqlCmd.Parameters.AddWithValue("@liq_impot", m.liq_impot);
                sqlCmd.Parameters.AddWithValue("@societe", id);

                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("mois/update/{ordre}")]
        [HttpPut]
        public IHttpActionResult update([FromBody] Mois m,int ordre)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Mois_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@ordre", ordre);
                sqlCmd.Parameters.AddWithValue("@designation", m.designation);
                sqlCmd.Parameters.AddWithValue("@cloture", m.cloture);
                sqlCmd.Parameters.AddWithValue("@base_calcul", m.base_calcul);
                sqlCmd.Parameters.AddWithValue("@taux_assiduite", m.taux_assiduite);
                sqlCmd.Parameters.AddWithValue("@assurance_groupe", m.assurance_groupe);
                sqlCmd.Parameters.AddWithValue("@liq_impot", m.liq_impot);
                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("mois/delete/{ordre}")]
        [HttpDelete]
        public IHttpActionResult delete(int ordre)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Mois_delete";
            sqlCmd.Parameters.AddWithValue("@ordre", ordre);
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

        [Route("mois/cloture/{ordre}/{societe}")]
        [HttpGet]
        public HttpResponseMessage check_cloture(int ordre,int societe)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Mois_cloture_check";
            sqlCmd.Parameters.AddWithValue("@ordre", ordre);
            sqlCmd.Parameters.AddWithValue("@societe", societe);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }







    }

    
}
