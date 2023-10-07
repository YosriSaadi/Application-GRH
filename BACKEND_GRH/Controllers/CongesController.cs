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
    public class CongesController : ApiController
    {

        [Route("conges_add/{exercice}")]
        [HttpPost]
        public IHttpActionResult addconge([FromBody] Conges r,int exercice)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "conges_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@matricule", r.matricule);
                sqlCmd.Parameters.AddWithValue("@mois", r.mois);
                sqlCmd.Parameters.AddWithValue("@fictif", r.paye);
                sqlCmd.Parameters.AddWithValue("@typec", r.typec);
                sqlCmd.Parameters.AddWithValue("@dated", r.dated);
                sqlCmd.Parameters.AddWithValue("@datef", r.datef);
                sqlCmd.Parameters.AddWithValue("@nbrj", r.nbr_jrs);
                sqlCmd.Parameters.AddWithValue("@exercice",exercice);



                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }
        
     

        //Update

        [Route("conges_update/{id}/{nbr_j}")]
        [HttpPut]
        public IHttpActionResult updateshift([FromBody] Conges r,int id,int nbr_j)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "conges_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();

                sqlCmd.Parameters.AddWithValue("@id", id);
                sqlCmd.Parameters.AddWithValue("@mois", r.mois);
                sqlCmd.Parameters.AddWithValue("@paye", r.paye);
                sqlCmd.Parameters.AddWithValue("@typec", r.typec);
                sqlCmd.Parameters.AddWithValue("@dated", r.dated);
                sqlCmd.Parameters.AddWithValue("@datef", r.datef);
                //new number of days
                sqlCmd.Parameters.AddWithValue("@n_nbr_j", r.nbr_jrs);
                //old number of days 
                sqlCmd.Parameters.AddWithValue("@nbr_j", nbr_j);
                sqlCmd.Parameters.AddWithValue("@matricule", r.matricule);




                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        //getbyname

        [Route("conges/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Get(int exercice)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "conges_all";
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Connection = myConnection;
            List<Societe> societes = new List<Societe>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("conges/nb_jours_mois/{matricule}/{mois}/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Get_Jours(int matricule,int mois,int exercice)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "conges_pris_mois";
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Parameters.AddWithValue("@matricule", matricule);
            sqlCmd.Parameters.AddWithValue("@mois", mois);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("conges_byid/{code}")]
        [HttpGet]
        public HttpResponseMessage Getshiftbyid(int code)
        {

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("conges_getbyid", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", code);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        [Route("conges_delete/{id}")]
        [HttpDelete]
        public IHttpActionResult deleteshiftbyid(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "conges_delete";
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