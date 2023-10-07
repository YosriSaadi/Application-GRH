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
    public class PrimeController : ApiController
    {
        [Route("primes/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Get(int exercice)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Prime_Select";
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("prime/add/{exercice}")]
        [HttpPost]
        public IHttpActionResult add([FromBody] Prime p,int exercice)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Prime_insert";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@matricule_employe", p.matricule);
                sqlCmd.Parameters.AddWithValue("@mois", p.mois);
                sqlCmd.Parameters.AddWithValue("@rubrique", p.rubrique);
                sqlCmd.Parameters.AddWithValue("@imposable", p.imposable);
                sqlCmd.Parameters.AddWithValue("@cotisable", p.cotisable);
                sqlCmd.Parameters.AddWithValue("@tfp", p.tfp);
                sqlCmd.Parameters.AddWithValue("@foprolos", p.foprolos);
                sqlCmd.Parameters.AddWithValue("@assurance_groupe", p.assurance_groupe);
                sqlCmd.Parameters.AddWithValue("@medecine_travail", p.medecine_travail);
                sqlCmd.Parameters.AddWithValue("@type", p.type);
                sqlCmd.Parameters.AddWithValue("@montant_fixe", p.montant_fixe);
                sqlCmd.Parameters.AddWithValue("@montant", p.montant_calcule);
                sqlCmd.Parameters.AddWithValue("@montant_min", p.montant_min);
                sqlCmd.Parameters.AddWithValue("@montant_max", p.montant_max);
                sqlCmd.Parameters.AddWithValue("@plafond", p.plafond);
                sqlCmd.Parameters.AddWithValue("@taux", p.taux);
                sqlCmd.Parameters.AddWithValue("@exercice", exercice);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }


        [Route("prime/delete/{id}")]
        [HttpDelete]
        public IHttpActionResult delete(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Prime_delete";
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


        [Route("prime/update/{id}")]
        [HttpPut]
        public IHttpActionResult update([FromBody] Prime p, int id)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Prime_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@mois", p.mois);
                sqlCmd.Parameters.AddWithValue("@rubrique", p.rubrique);
                sqlCmd.Parameters.AddWithValue("@imposable", p.imposable);
                sqlCmd.Parameters.AddWithValue("@cotisable", p.cotisable);
                sqlCmd.Parameters.AddWithValue("@tfp", p.tfp);
                sqlCmd.Parameters.AddWithValue("@foprolos", p.foprolos);
                sqlCmd.Parameters.AddWithValue("@assurance_groupe", p.assurance_groupe);
                sqlCmd.Parameters.AddWithValue("@medecine_travail", p.medecine_travail);
                sqlCmd.Parameters.AddWithValue("@type", p.type);
                sqlCmd.Parameters.AddWithValue("@montant", p.montant_calcule);
                sqlCmd.Parameters.AddWithValue("@montant_fixe", p.montant_fixe);
                sqlCmd.Parameters.AddWithValue("@montant_min", p.montant_min);
                sqlCmd.Parameters.AddWithValue("@montant_max", p.montant_max);
                sqlCmd.Parameters.AddWithValue("@plafond", p.plafond);
                sqlCmd.Parameters.AddWithValue("@taux", p.taux);
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
