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
    public class EmployeeController : ApiController
    {
        private Employee regime = new Employee();

        [Route("employee_add/{societe}")]
        [HttpPost]
        public IHttpActionResult addemp([FromBody] Employee r,int societe )
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "employee_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@matricule", r.matricule);
                sqlCmd.Parameters.AddWithValue("@nom", r.nom);
                sqlCmd.Parameters.AddWithValue("@prenom", r.prenom);
                sqlCmd.Parameters.AddWithValue("@datenaiss", r.datenaiss);
                sqlCmd.Parameters.AddWithValue("@lieu", r.lieu);
                sqlCmd.Parameters.AddWithValue("@nationalite", r.nationnalite);
                sqlCmd.Parameters.AddWithValue("@NCin", r.NCin);
                sqlCmd.Parameters.AddWithValue("@lieuC", r.lieuC);
                sqlCmd.Parameters.AddWithValue("@dateC", r.dateC);
                sqlCmd.Parameters.AddWithValue("@adresse", r.adresse);
                sqlCmd.Parameters.AddWithValue("@Ntel", r.Ntel);
                sqlCmd.Parameters.AddWithValue("@dateEmb", r.dateEmb);
                sqlCmd.Parameters.AddWithValue("@sexe", r.sexe);
                sqlCmd.Parameters.AddWithValue("@dateEmbGrp", r.dateEmbGrp);
                sqlCmd.Parameters.AddWithValue("@creditB", r.creditB);
                sqlCmd.Parameters.AddWithValue("@creditS", r.creditS);
                sqlCmd.Parameters.AddWithValue("@etat", r.etat);
                sqlCmd.Parameters.AddWithValue("@chef", r.cheffamille);
                sqlCmd.Parameters.AddWithValue("@departement", r.departement);
                sqlCmd.Parameters.AddWithValue("@service", r.service);
                sqlCmd.Parameters.AddWithValue("@section", r.section);
                sqlCmd.Parameters.AddWithValue("@college", r.college);
                sqlCmd.Parameters.AddWithValue("@dateaff", r.dateaff);
                sqlCmd.Parameters.AddWithValue("@societe_id", societe);

                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)

            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

  
        //Update

        [Route("employee_update")]
        [HttpPut]
        public IHttpActionResult updateshift([FromBody] Employee r)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "employee_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@matricule", r.matricule);
                sqlCmd.Parameters.AddWithValue("@nom", r.nom);
                sqlCmd.Parameters.AddWithValue("@prenom", r.prenom);
                sqlCmd.Parameters.AddWithValue("@datenaiss", r.datenaiss);
                sqlCmd.Parameters.AddWithValue("@lieu", r.lieu);
                sqlCmd.Parameters.AddWithValue("@nationalite", r.nationnalite);
                sqlCmd.Parameters.AddWithValue("@NCin", r.NCin);
                sqlCmd.Parameters.AddWithValue("@lieuC", r.lieuC);
                sqlCmd.Parameters.AddWithValue("@dateC", r.dateC);
                sqlCmd.Parameters.AddWithValue("@adresse", r.adresse);
                sqlCmd.Parameters.AddWithValue("@Ntel", r.Ntel);
                sqlCmd.Parameters.AddWithValue("@dateEmb", r.dateEmb);
                sqlCmd.Parameters.AddWithValue("@sexe", r.sexe);
                sqlCmd.Parameters.AddWithValue("@college", r.college);
                sqlCmd.Parameters.AddWithValue("@dateEmbGrp", r.dateEmbGrp);
                sqlCmd.Parameters.AddWithValue("@creditB", r.creditB);
                sqlCmd.Parameters.AddWithValue("@creditS", r.creditS);
                sqlCmd.Parameters.AddWithValue("@etat", r.etat);
                sqlCmd.Parameters.AddWithValue("@cheffamille", r.cheffamille);
                sqlCmd.Parameters.AddWithValue("@departement", r.departement);
                sqlCmd.Parameters.AddWithValue("@service", r.service);
                sqlCmd.Parameters.AddWithValue("@section", r.section);
                sqlCmd.Parameters.AddWithValue("@dateaff", r.dateaff);

                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        //getbyname


        [Route("employes/{societe}")]
        [HttpGet]
        public HttpResponseMessage Get(int societe)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "employee_all";
            sqlCmd.Parameters.AddWithValue("@societe", societe);
            sqlCmd.Connection = myConnection;
            List<Societe> societes = new List<Societe>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("employee_byid/{code}")]
        [HttpGet]
        public HttpResponseMessage Getshiftbyid(String code)
        {

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("employee_getbyid", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@matricule", code);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        [Route("employee_delete/{id}")]
        [HttpDelete]
        public IHttpActionResult deleteshiftbyid(string id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "employee_delete";
            sqlCmd.Parameters.AddWithValue("@matricule", id);
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
        
         [Route("employee/matricule/{matricule}")]
        [HttpGet]
        public HttpResponseMessage Getemployeeby_matricule(int matricule)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "employee_Getmatricule";
            sqlCmd.Connection = myConnection;
            sqlCmd.Parameters.AddWithValue("@matricule", matricule);
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }








    }
}