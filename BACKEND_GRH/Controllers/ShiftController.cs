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
    public class ShiftController : ApiController
    {

        [Route("shifts_add")]
        [HttpPost]
        public IHttpActionResult addshift([FromBody] Shift r)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "shift_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@code", r.code);
                sqlCmd.Parameters.AddWithValue("@shift", r.shift);
                sqlCmd.Parameters.AddWithValue("@regime", r.regime);
                sqlCmd.Parameters.AddWithValue("@nbrjm", r.nbrjm);
                sqlCmd.Parameters.AddWithValue("@nbrhm", r.nbrhm);
                sqlCmd.Parameters.AddWithValue("@horaire", r.horaire);
                sqlCmd.Parameters.AddWithValue("@nbrpm", r.nbrpm);
                sqlCmd.Parameters.AddWithValue("@defaut", r.defaut);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

       /* private IHttpActionResult BadRequest(string v)
        {
            throw new NotImplementedException();
        }*/

        //Update

        [Route("shifts_update")]
        [HttpPut]
        public IHttpActionResult updateshift([FromBody] Shift r)
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
                sqlCmd.Parameters.AddWithValue("@defaut", r.defaut);
                sqlCmd.Parameters.AddWithValue("@code", r.code);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        //getbyname

        [Route("shift/{societe}")]
        [HttpGet]
        public HttpResponseMessage Get(int societe)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "shift_all";
            sqlCmd.Parameters.AddWithValue("@societe", societe);
            sqlCmd.Connection = myConnection;
            List<Societe> societes = new List<Societe>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("shiftsbyid/{code}")]
        [HttpGet]
        public HttpResponseMessage Getshiftbyid(String code)
        {

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("shift_getbyid", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@code", code);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        [Route("shifts_delete/{id}")]
        [HttpDelete]
        public IHttpActionResult deleteshiftbyid(string id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "shift_delete";
            sqlCmd.Parameters.AddWithValue("@code", id);
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