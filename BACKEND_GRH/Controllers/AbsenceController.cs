using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BACKEND_GRH.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace BACKEND_GRH.Controllers
{
    public class AbsenceController : ApiController
    {

        [Route("absences/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Get(int exercice)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Absence_all";
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("absences_nombre_jours/{matricule}/{mois}/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Get_nombre_jours(int exercice ,string matricule,int mois)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Absence_nb_jours_matricule";
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Parameters.AddWithValue("@matricule", matricule);
            sqlCmd.Parameters.AddWithValue("@mois", mois);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("absences/add/{exercice}")]
        [HttpPost]
        public IHttpActionResult add([FromBody] Absence a,int exercice)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Absence_insert";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@motif", a.motif);
                sqlCmd.Parameters.AddWithValue("@date_debut", a.date_debut);
                sqlCmd.Parameters.AddWithValue("@date_fin", a.date_fin);
                sqlCmd.Parameters.AddWithValue("@abattable", a.abattable);
                sqlCmd.Parameters.AddWithValue("@matricule_employe", a.matricule_employe);
                sqlCmd.Parameters.AddWithValue("@exercice", exercice);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("absence/update/{id}")]
        [HttpPut]
        public IHttpActionResult update([FromBody] Absence a, int id)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Absence_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@motif", a.motif);
                sqlCmd.Parameters.AddWithValue("@date_debut", a.date_debut);
                sqlCmd.Parameters.AddWithValue("@date_fin", a.date_fin);
                sqlCmd.Parameters.AddWithValue("@abattable", a.abattable);
                sqlCmd.Parameters.AddWithValue("@id", id);
                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("absence/delete/{id}")]
        [HttpDelete]
        public IHttpActionResult delete(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Absence_delete";
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
