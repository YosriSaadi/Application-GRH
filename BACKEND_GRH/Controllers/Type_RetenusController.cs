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
    public class Type_RetenusController : ApiController
    {

        [Route("retenu_add/{societe}")]
        [HttpPost]
        public IHttpActionResult addretenue([FromBody] GRH_RETENUS r,int societe)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "type_retenus_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@code", r.code);
                sqlCmd.Parameters.AddWithValue("@designation", r.designation);
                sqlCmd.Parameters.AddWithValue("@societe", societe);




                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

    

        //Update

        [Route("retenu_update")]
        [HttpPut]
        public IHttpActionResult updateretenue([FromBody] GRH_RETENUS r)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "type_retenus_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@code", r.code);
                sqlCmd.Parameters.AddWithValue("@designation", r.designation);
     

                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        //getbyname

        [Route("type_retenus/{societe}")]
        [HttpGet]
        public HttpResponseMessage Get(int societe)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "type_retenus_all";
            sqlCmd.Parameters.AddWithValue("@societe", societe);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("retenu_typeids/{id}")]
        [HttpGet]
        public HttpResponseMessage Getids(int id)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "type_retenus_getbyid";
            sqlCmd.Parameters.AddWithValue("@id", id);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("retenu_typebyid/{code}")]
        [HttpGet]
        public HttpResponseMessage Getshiftbyid(String code)
        {

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("retenus_getbyid", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@code", code);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        [Route("retenu_delete/{id}")]
        [HttpDelete]
        public IHttpActionResult deleteshiftbyid(string id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "type_retenus_delete";
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