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

namespace BACKEND_GRH.Controllers
{
    public class SocieteController : ApiController
    {


    private Societe Societe=new Societe();

        [Route("add/societe")]
        [HttpPost]
        public IHttpActionResult add([FromBody] Societe s)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "societe_add";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@nom", s.nom);
                sqlCmd.Parameters.AddWithValue("@adresse", s.adresse);
                sqlCmd.Parameters.AddWithValue("@ville", s.ville);
                sqlCmd.Parameters.AddWithValue("@rue", s.rue);
                sqlCmd.Parameters.AddWithValue("@code_postal", s.code_postal);
                sqlCmd.Parameters.AddWithValue("@tel", s.tel);
                sqlCmd.Parameters.AddWithValue("@email", s.email);
                sqlCmd.Parameters.AddWithValue("@fax", s.fax);
                sqlCmd.Parameters.AddWithValue("@matricule_cnss", s.matricule_cnss);
                sqlCmd.Parameters.AddWithValue("@date_ouverture", s.date_ouverture);
                sqlCmd.Parameters.AddWithValue("@Activite", s.Activite);
                sqlCmd.Parameters.AddWithValue("@matricule_fiscal", s.matricule_fiscal);
                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        }

        //Update

        [Route("update/societe/{id}")]
        [HttpPut]
        public IHttpActionResult updateda([FromBody] Societe s,int id)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "societe_update_byid";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                sqlCmd.Parameters.AddWithValue("@nom", s.nom);
                sqlCmd.Parameters.AddWithValue("@adresse", s.adresse);
                sqlCmd.Parameters.AddWithValue("@ville",s.ville);
                sqlCmd.Parameters.AddWithValue("@rue", s.rue);
                sqlCmd.Parameters.AddWithValue("@code_postal", s.code_postal);
                sqlCmd.Parameters.AddWithValue("@tel", s.tel);          
                sqlCmd.Parameters.AddWithValue("@email",s.email);
                sqlCmd.Parameters.AddWithValue("@fax", s.fax);
                sqlCmd.Parameters.AddWithValue("@matricule_cnss", s.matricule_cnss);
                sqlCmd.Parameters.AddWithValue("@date_ouverture", s.date_ouverture); 
                sqlCmd.Parameters.AddWithValue("@Activite", s.Activite);
                sqlCmd.Parameters.AddWithValue("@matricule_fiscal", s.matricule_fiscal);
                sqlCmd.Parameters.AddWithValue("@id", id);
                sqlCmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                return BadRequest("Erreur: " + e.Message + "*Source: " + e.Source + "*StackTrace: " + e.StackTrace);
            }

            return Ok();
        } 

        //getbyname
        [Route("getsociete/{name}")]
        [HttpGet]
        public Societe getsocietebyname(string name)
        {
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "societe_select_byname";
            sqlCmd.Parameters.AddWithValue("@name", name);
            sqlCmd.Connection = myConnection;

            try
            {
                myConnection.Open();
                SqlDataReader dr = sqlCmd.ExecuteReader();
                var s = new Societe();

                while (dr.Read())
                {
                    s.id= Convert.ToInt32(dr["id"].ToString());
                    s.nom = dr["nom"].ToString();
                    s.adresse= dr["adresse"].ToString();
                    s.ville= dr["ville"].ToString();
                    s.rue = dr["rue"].ToString();
                    s.code_postal = Convert.ToInt32(dr["code_postal"]);
                    s.tel = Convert.ToInt32(dr["tel"]);
                    s.email = dr["email"].ToString();
                    //mochkel Int64
                    s.fax = (int)Convert.ToInt64(dr["fax"].ToString());
                    s.matricule_cnss = dr["matricule_cnss"].ToString();
                    s.date_ouverture = dr["date_ouverture"].ToString();
                    s.Activite = dr["Activite"].ToString();
                    s.matricule_fiscal = dr["matricule_fiscal"].ToString();

                }
                dr.Close();
                return s;
            }
            catch (Exception)
            {
                throw;
            }
        }


        [Route("api/Societes")]
        [HttpGet]
        public  HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "societe_select_all";
            sqlCmd.Connection = myConnection;
            List<Societe> societes = new List<Societe>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        
        [Route("api/Societebyname")]
        [HttpGet]
        public HttpResponseMessage Getsocietebyname(String name)
        {
           
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["conn"].ConnectionString))
            using (var cmd = new SqlCommand("sel_Societebyname", con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                
                cmd.Parameters.Add("name",SqlDbType.VarChar);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);

        }


        [Route("deletesociete/{id}")]
        [HttpDelete]
        public IHttpActionResult deletesocietebyidid(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "societe_deletebyid";
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




        [Route("societesexercice/{id}")]
        [HttpGet]
        public HttpResponseMessage Getsocieteexercice(int id)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Societe_exercices";
            sqlCmd.Parameters.AddWithValue("@id",id);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("societesnames")]
        [HttpGet]
        public HttpResponseMessage Getsocietenames()
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "societe_allname";
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        //getbyid
        [Route("getsociete/id/{id}")]
        [HttpGet]
        public Societe getsocietebyid(int id)
        {
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "societe_select_byid";
            sqlCmd.Parameters.AddWithValue("@id", id);
            sqlCmd.Connection = myConnection;

            try
            {
                myConnection.Open();
                SqlDataReader dr = sqlCmd.ExecuteReader();
                var s = new Societe();

                while (dr.Read())
                {
                    s.id = Convert.ToInt32(dr["id"].ToString());
                    s.nom = dr["nom"].ToString();
                    s.adresse = dr["adresse"].ToString();
                    s.ville = dr["ville"].ToString();
                    s.rue = dr["rue"].ToString();
                    s.code_postal = Convert.ToInt32(dr["code_postal"]);
                    s.tel = Convert.ToInt32(dr["tel"]);
                    s.email = dr["email"].ToString();
                    //mochkel Int64
                    s.fax = (int)Convert.ToInt64(dr["fax"].ToString());
                    s.matricule_cnss = dr["matricule_cnss"].ToString();
                    s.date_ouverture = dr["date_ouverture"].ToString();
                    s.Activite = dr["Activite"].ToString();
                    s.matricule_fiscal = dr["matricule_fiscal"].ToString();

                }
                dr.Close();
                return s;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [Route("societes/exercices/{user}")]
        [HttpGet]
        public HttpResponseMessage Getexercice(String user)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Exercices_select";
            sqlCmd.Parameters.AddWithValue("@user", user);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("exercices_info/{id}")]
        [HttpGet]
        public HttpResponseMessage Getexerciceinfo(int id)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Exercice_selectbyid";
            sqlCmd.Parameters.AddWithValue("@id", id);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }









    }
}
