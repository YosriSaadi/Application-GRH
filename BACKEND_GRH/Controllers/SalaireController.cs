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
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace BACKEND_GRH.Controllers
{
    public class SalaireController : ApiController
    {

        [Route("salaire_add")]
        [HttpPost]
        public IHttpActionResult addsallaire([FromBody] Salaire r)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "salaire_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();


                sqlCmd.Parameters.AddWithValue("@mode", r.mode);
                sqlCmd.Parameters.AddWithValue("@compte", r.compte);
                sqlCmd.Parameters.AddWithValue("@Ncompte", r.Ncompte);
                sqlCmd.Parameters.AddWithValue("@Nrib", r.Nrib);
                sqlCmd.Parameters.AddWithValue("@Banque", r.Banque);
                sqlCmd.Parameters.AddWithValue("@agence", r.agence);

                sqlCmd.Parameters.AddWithValue("@taux", r.taux);
                sqlCmd.Parameters.AddWithValue("@dureeEch", r.dureeEch);
                sqlCmd.Parameters.AddWithValue("@anciennete_eff", r.anciennete_eff);
                sqlCmd.Parameters.AddWithValue("@sal_base", r.sal_base);
                sqlCmd.Parameters.AddWithValue("@supp", r.supp);
                sqlCmd.Parameters.AddWithValue("@thorairehs", r.thorairehs);
                sqlCmd.Parameters.AddWithValue("@shift", r.shift);
                sqlCmd.Parameters.AddWithValue("@matricule", r.matricule);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }


        //Update

        [Route("salaire_update")]
        [HttpPut]
        public IHttpActionResult updatesallaire([FromBody] Salaire r)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "salaire_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@mode", r.mode);
                sqlCmd.Parameters.AddWithValue("@compte", r.compte);
                sqlCmd.Parameters.AddWithValue("@Ncompte", r.Ncompte);
                sqlCmd.Parameters.AddWithValue("@Nrib", r.Nrib);
                sqlCmd.Parameters.AddWithValue("@Banque", r.Banque);
                sqlCmd.Parameters.AddWithValue("@agence", r.agence);
                sqlCmd.Parameters.AddWithValue("@taux", r.taux);
                sqlCmd.Parameters.AddWithValue("@dureeEch", r.dureeEch);
                sqlCmd.Parameters.AddWithValue("@anciennete_eff", r.anciennete_eff);
                sqlCmd.Parameters.AddWithValue("@sal_base", r.sal_base);
                sqlCmd.Parameters.AddWithValue("@supp", r.supp);
                sqlCmd.Parameters.AddWithValue("@thorairehs", r.thorairehs);
                sqlCmd.Parameters.AddWithValue("@shift", r.shift);
                sqlCmd.Parameters.AddWithValue("@matricule", r.id);



                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        //getbyname

        [Route("salaires")]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "salaire_all";
            sqlCmd.Connection = myConnection;
            List<Societe> societes = new List<Societe>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("salaire_byid/{matricule}")]
        [HttpGet]
        public HttpResponseMessage Getshiftbyid(String matricule)
        {

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("salaire_getbyid", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@matricule", matricule);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        [Route("salaire_delete/{id}")]
        [HttpDelete]
        public IHttpActionResult deletesallairebyid(string id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "salaire_delete";
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