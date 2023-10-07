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
    public class IRPPController : ApiController
    {
        private Shift regime = new Shift();


        [Route("irpp_add/{societeid}")]
        [HttpPost]
        public IHttpActionResult add([FromBody] IRPP r,int societeid)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "irpp_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@id", r.id);
                sqlCmd.Parameters.AddWithValue("@designation", r.designation);
                sqlCmd.Parameters.AddWithValue("@frais_prof", r.frais_prof);
                sqlCmd.Parameters.AddWithValue("@cheffamille", r.cheffam);
                sqlCmd.Parameters.AddWithValue("@defaut", r.defaut);
                sqlCmd.Parameters.AddWithValue("@enfant1", r.enfant1);
                sqlCmd.Parameters.AddWithValue("@enfant2", r.enfant2);
                sqlCmd.Parameters.AddWithValue("@enfant3", r.enfant3);
                sqlCmd.Parameters.AddWithValue("@enfant4", r.enfant4);
                sqlCmd.Parameters.AddWithValue("@enfant_infirme", r.enfant_infirme);
                sqlCmd.Parameters.AddWithValue("@enfant_etu", r.enfant_etu);
                sqlCmd.Parameters.AddWithValue("@parent", r.parent);
                sqlCmd.Parameters.AddWithValue("@t1", r.t1);
                sqlCmd.Parameters.AddWithValue("@t2", r.t2);
                sqlCmd.Parameters.AddWithValue("@t3", r.t3);
                sqlCmd.Parameters.AddWithValue("@t4", r.t4);
                sqlCmd.Parameters.AddWithValue("@t5", r.t5);
                sqlCmd.Parameters.AddWithValue("@t6", r.t6);
                sqlCmd.Parameters.AddWithValue("@ta1", r.ta1);
                sqlCmd.Parameters.AddWithValue("@ta2", r.ta2);
                sqlCmd.Parameters.AddWithValue("@ta3", r.ta3);
                sqlCmd.Parameters.AddWithValue("@ta4", r.ta4);
                sqlCmd.Parameters.AddWithValue("@ta5", r.ta5);
                sqlCmd.Parameters.AddWithValue("@ta6", r.ta6);
                sqlCmd.Parameters.AddWithValue("@societe_id", societeid);




                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }
      

        //Update

        [Route("irpp_update")]
        [HttpPut]
        public IHttpActionResult updateshift([FromBody] IRPP r)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "irpp_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@designation", r.designation);
                sqlCmd.Parameters.AddWithValue("@frais_prof", r.frais_prof);
                sqlCmd.Parameters.AddWithValue("@cheffamille", r.cheffam);
                sqlCmd.Parameters.AddWithValue("@defaut", r.defaut);
                sqlCmd.Parameters.AddWithValue("@enfant1", r.enfant1);
                sqlCmd.Parameters.AddWithValue("@enfant2", r.enfant2);
                sqlCmd.Parameters.AddWithValue("@enfant3", r.enfant3);
                sqlCmd.Parameters.AddWithValue("@enfant4", r.enfant4);
                sqlCmd.Parameters.AddWithValue("@enfant_infirme", r.enfant_infirme);
                sqlCmd.Parameters.AddWithValue("@enfant_etu", r.enfant_etu);
                sqlCmd.Parameters.AddWithValue("@parent", r.parent);
                sqlCmd.Parameters.AddWithValue("@t1", r.t1);
                sqlCmd.Parameters.AddWithValue("@t2", r.t2);
                sqlCmd.Parameters.AddWithValue("@t3", r.t3);
                sqlCmd.Parameters.AddWithValue("@t4", r.t4);
                sqlCmd.Parameters.AddWithValue("@t5", r.t5);
                sqlCmd.Parameters.AddWithValue("@t6", r.t6);
                sqlCmd.Parameters.AddWithValue("@ta1", r.ta1);
                sqlCmd.Parameters.AddWithValue("@ta2", r.ta2);
                sqlCmd.Parameters.AddWithValue("@ta3", r.ta3);
                sqlCmd.Parameters.AddWithValue("@ta4", r.ta4);
                sqlCmd.Parameters.AddWithValue("@ta5", r.ta5);
                sqlCmd.Parameters.AddWithValue("@ta6", r.ta6);
                sqlCmd.Parameters.AddWithValue("@id", r.id);

                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        //getbyname




        [Route("irpps/{societe}")]
        [HttpGet]
        public HttpResponseMessage Get(int societe)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "irpp_all";
            sqlCmd.Connection = myConnection;
            sqlCmd.Parameters.AddWithValue("@societe", societe);

            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("irpp_byid/{code}")]
        [HttpGet]
        public HttpResponseMessage Getshiftbyid(String code)
        {

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("irpp_getbyid", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@id", code);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        [Route("irpp_delete/{id}")]
        [HttpDelete]
        public IHttpActionResult deleteshiftbyid(string id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "irpp_delete";
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