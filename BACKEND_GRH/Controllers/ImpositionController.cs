using BACKEND_GRH.Models;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace BACKEND_GRH.Controllers
{
    public class ImpositionController : ApiController
    {

        [Route("imposition_add")]
        [HttpPost]
        public IHttpActionResult addshift([FromBody] Imposition r)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "imposition_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@matCNSS", r.matCNSS);
                sqlCmd.Parameters.AddWithValue("@dateaff", r.dateaff);
                sqlCmd.Parameters.AddWithValue("@cotisationE", r.cotisationE);
                sqlCmd.Parameters.AddWithValue("@cotisationP", r.cotisationP);
                sqlCmd.Parameters.AddWithValue("@accidenttra", r.accidenttra);
                sqlCmd.Parameters.AddWithValue("@medecinetra", r.medecinetra);
                sqlCmd.Parameters.AddWithValue("@regimeIirpp", r.regimeIirpp);
                sqlCmd.Parameters.AddWithValue("@baremeirpp", r.baremeirpp);
                sqlCmd.Parameters.AddWithValue("@nbreMens", r.nbreMens);
                sqlCmd.Parameters.AddWithValue("@assurancevie", r.assurancevie);
                sqlCmd.Parameters.AddWithValue("@interetann", r.interetann);
                sqlCmd.Parameters.AddWithValue("@tfp", r.tfp);
                sqlCmd.Parameters.AddWithValue("@foprolos", r.foprolos);
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

        [Route("shift_update/{id}")]
        [HttpPut]
        public IHttpActionResult updateshift([FromBody] Shift r, string id)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "shift_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@shift", r.shift);
                sqlCmd.Parameters.AddWithValue("@regime", r.regime);
                sqlCmd.Parameters.AddWithValue("@nbrjm", r.nbrjm);
                sqlCmd.Parameters.AddWithValue("@nbrhm", r.nbrhm);
                sqlCmd.Parameters.AddWithValue("@horaire", r.horaire);
                sqlCmd.Parameters.AddWithValue("@nbrpm", r.nbrpm);
                sqlCmd.Parameters.AddWithValue("@code", id);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        //getbyname

        [Route("imposition")]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "imposition_all";
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("imposition_byid/{code}")]
        [HttpGet]
        public HttpResponseMessage Getshiftbyid(String code)
        {

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("imposition_getbyid", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", code);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }
        [Route("imposition_by_matricule/{matricule}")]
        [HttpGet]
        public HttpResponseMessage Getimposition_by_mat(String matricule)
        {

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("imposition_by_matricule", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@matricule", matricule);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        [Route("imposition_delete/{id}")]
        [HttpDelete]
        public IHttpActionResult deleteshiftbyid(string id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "imposition_delete";
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