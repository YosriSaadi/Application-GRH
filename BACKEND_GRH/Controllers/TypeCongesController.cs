﻿using System;
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
    public class TypeCongesController : ApiController
    {

        [Route("type_conges_add/{societe}")]
        [HttpPost]
        public IHttpActionResult addshift([FromBody] GRH_TYPE_CONGES r,int societe)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "type_conges_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@code", r.code);
                sqlCmd.Parameters.AddWithValue("@designation", r.designation);
                sqlCmd.Parameters.AddWithValue("@conge_an", r.conge_an);
                sqlCmd.Parameters.AddWithValue("@paye", r.paye);
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

        [Route("type_conges_update")]
        [HttpPut]
        public IHttpActionResult updateshift([FromBody] GRH_TYPE_CONGES r)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "type_conges_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@code", r.code);
                sqlCmd.Parameters.AddWithValue("@designation", r.designation);
                sqlCmd.Parameters.AddWithValue("@conge_an", r.conge_an);
                sqlCmd.Parameters.AddWithValue("@paye", r.paye);


                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        //getbyname

        [Route("type_conges/{societe}")]
        [HttpGet]
        public HttpResponseMessage Get(int societe)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "type_conges_all";
            sqlCmd.Parameters.AddWithValue("@societe", societe);
            sqlCmd.Connection = myConnection;

            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("type_conges_typeids")]
        [HttpGet]
        public HttpResponseMessage Getids()
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "type_conges_ids";
            sqlCmd.Connection = myConnection;
            List<Societe> societes = new List<Societe>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("type_conges_typebyid/{code}")]
        [HttpGet]
        public HttpResponseMessage Getshiftbyid(String code)
        {

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("type_conges_getbyid", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@code", code);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        [Route("type_conges_delete/{id}")]
        [HttpDelete]
        public IHttpActionResult deleteshiftbyid(string id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "type_conges_delete";
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