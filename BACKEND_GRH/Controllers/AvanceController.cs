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
    public class AvanceController : ApiController
    {
        [Route("avances/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Get(int exercice)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Avance_select_All";
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Connection = myConnection;
            List<Pret> prets = new List<Pret>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        [Route("avance/add/{exercice}")]
        [HttpPost]
        public IHttpActionResult add([FromBody] Avance a, int exercice)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Avance_insert";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@montant", a.montant);
                sqlCmd.Parameters.AddWithValue("@observation", a.observation);
                sqlCmd.Parameters.AddWithValue("@date", a.date);
                //sqlCmd.Parameters.AddWithValue("@etat_solde", a.etat_solde);
                sqlCmd.Parameters.AddWithValue("@type", a.type);
                sqlCmd.Parameters.AddWithValue("@mois_imputation", a.mois_imputation);
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


        [Route("avance/update/{id}")]
        [HttpPut]
        public IHttpActionResult update([FromBody] Avance a, int id)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Avance_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@montant", a.montant);
                sqlCmd.Parameters.AddWithValue("@observation", a.observation);
                sqlCmd.Parameters.AddWithValue("@date", a.date);
                sqlCmd.Parameters.AddWithValue("@etat_solde", a.etat_solde);
                sqlCmd.Parameters.AddWithValue("@type", a.type);
                sqlCmd.Parameters.AddWithValue("@mois_imputation", a.mois_imputation);
                sqlCmd.Parameters.AddWithValue("@id", id);
                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("avance/delete/{id}")]
        [HttpDelete]
        public IHttpActionResult deletesocietebyidid(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Avance_delete";
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
