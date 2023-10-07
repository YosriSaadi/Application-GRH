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
    public class PretController : ApiController
    {
        [Route("prets/{etat_solde}/{type}/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Get(String etat_solde,String type,int exercice)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            if(Equals(type,"Tous"))
            sqlCmd.CommandText = "Prets_select_Tous";
            else if(Equals(type, "pretste"))
            sqlCmd.CommandText = "Prets_select_sociéte";
            else
            sqlCmd.CommandText = "Prets_select_autrepret";
            sqlCmd.Parameters.AddWithValue("@etat_solde", etat_solde);
            sqlCmd.Parameters.AddWithValue("@type", type);
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);

            sqlCmd.Connection = myConnection;        
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }



        [Route("prets/add/{exercice}")]
        [HttpPost]
        public IHttpActionResult add([FromBody] Pret p,int exercice)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Prets_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@montant_pret", p.montant_pret);
                sqlCmd.Parameters.AddWithValue("@date", p.date);
                sqlCmd.Parameters.AddWithValue("@libelle", p.libelle);
                sqlCmd.Parameters.AddWithValue("@type", p.type);
                sqlCmd.Parameters.AddWithValue("@montant_solde", p.montant_solde); 
                sqlCmd.Parameters.AddWithValue("@matricule_employe", p.matricule_employe);
                sqlCmd.Parameters.AddWithValue("@exercice", exercice);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        [Route("pret/echeances/{id}")]
        [HttpGet]
        public HttpResponseMessage Getecheancebyid(int id)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Pret_echeance_select_id";
            sqlCmd.Connection = myConnection;
            sqlCmd.Parameters.AddWithValue("@id", id);
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

       



        [Route("prets/echeance/add")]
        [HttpPost]
        public IHttpActionResult addecheance([FromBody] Pret p)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Pret_echeance_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();

                sqlCmd.Parameters.AddWithValue("@montant_echeance", p.montant_echeance);
                sqlCmd.Parameters.AddWithValue("@montant", p.montant_pret);
                sqlCmd.Parameters.AddWithValue("@date", p.date);
                sqlCmd.Parameters.AddWithValue("@date_echeance", p.date_echeance);
                sqlCmd.Parameters.AddWithValue("@solde", p.solde);
                sqlCmd.Parameters.AddWithValue("@matricule_employe", p.matricule_employe);
                sqlCmd.Parameters.AddWithValue("@observation", p.observation);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }



        [Route("prets/echeance/etatsolde")]
        [HttpPut]
        public IHttpActionResult modifierecheanceetat([FromBody] Pret p)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;

                if (Equals(p.solde,"Soldé"))
                {
                    sqlCmd.CommandText = "Pret_echeance_solde_oui";
                    sqlCmd.Connection = myConnection;
                    myConnection.Open();
                    sqlCmd.Parameters.AddWithValue("@montant_echeance", p.montant_echeance);
                    sqlCmd.Parameters.AddWithValue("@id", p.id);
                    sqlCmd.Parameters.AddWithValue("@pret_id", p.pret_id);
                   
                }
                else
                {
                    sqlCmd.CommandText = "Pret_echeance_solde_non";
                    sqlCmd.Connection = myConnection;
                    myConnection.Open();
                    sqlCmd.Parameters.AddWithValue("@montant_echeance", p.montant_echeance);
                    sqlCmd.Parameters.AddWithValue("@id", p.id);
                    sqlCmd.Parameters.AddWithValue("@pret_id", p.pret_id);
                }

                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }


        [Route("pret/delete/{id}")]
        [HttpDelete]
        public IHttpActionResult delete(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Pret_Delete";
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

        [Route("echeance/update")]
        [HttpPut]
        public IHttpActionResult update([FromBody] Pret p)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Pret_echeance_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@observation", p.observation);
                sqlCmd.Parameters.AddWithValue("@date_echeance", p.date_echeance);
                sqlCmd.Parameters.AddWithValue("@solde", p.solde);
                sqlCmd.Parameters.AddWithValue("@id", p.id);
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
