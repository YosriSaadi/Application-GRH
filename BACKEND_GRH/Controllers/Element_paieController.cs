using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BACKEND_GRH.Models;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
namespace BACKEND_GRH.Controllers
{
    public class Element_paieController : ApiController
    {

        //Getbyid
        [Route("societe/elementpaie/{id}")]
        [HttpGet]
        public Element_paie getelemntspaie(int id)
        {
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Element_paie_selectbyid";
            sqlCmd.Parameters.AddWithValue("@id", id);
            sqlCmd.Connection = myConnection;

            try
            {
                myConnection.Open();
                SqlDataReader dr = sqlCmd.ExecuteReader();
                var s = new Element_paie();

                while (dr.Read())
                {
                    //cnss
                    s.societe_id = Convert.ToInt32(dr["societe_id"].ToString());
                    s.cnss_cot_patronal = float.Parse(dr["cnss_cot_patronal"].ToString());
                    s.cnss_cot_employe = float.Parse(dr["cnss_cot_employe"].ToString());
                    s.cnss_acc_travail = float.Parse(dr["cnss_acc_travail"].ToString());
                    s.cnss_medecin_travail = float.Parse(dr["cnss_medecin_travail"].ToString());
                    s.cnss_regimec_employe = float.Parse(dr["cnss_regimec_employe"].ToString());
                    s.cnss_regimec_patron = float.Parse(dr["cnss_regimec_patron"].ToString());
                    //autr impot
                    s.irpp = float.Parse(dr["irpp"].ToString());
                    s.tfp = float.Parse(dr["tfp"].ToString());
                    s.foprolos = float.Parse(dr["foprolos"].ToString());
                    //assurance
                    s.assurance_type = dr["assurance_type"].ToString();
                    s.assurance_numcontrat = (int)Convert.ToInt64(dr["assurance_numcontrat"].ToString());
                    s.assurance_tauxemploye = float.Parse(dr["assurance_tauxemploye"].ToString());
                    s.assurance_tauxemployeur = float.Parse(dr["assurance_tauxemployeur"].ToString());
                    s.assurance_imposition = dr["assurance_imposition"].ToString();
                    s.assurance_compagnie = dr["assurance_compagnie"].ToString();
                    s.assurance_datedebut = dr["assurance_datedebut"].ToString();
                    s.assurance_datefin = dr["assurance_datefin"].ToString();
                    s.gestion_presence = dr["gestion_presence"].ToString();
                    s.paie_calendrier = dr["paie_calendrier"].ToString();
                    s.liquidation_impot = dr["liquidation_impot"].ToString();
                    //Prime_Rendement
                    s.arrond_irpp = dr["arrond_irpp"].ToString();
                    s.prime_rend = dr["prime_rend"].ToString();
                    s.mois_prime_rend = (int)Convert.ToInt32(dr["mois_prime_rend"].ToString());
                    s.periode_prime_rend = dr["periode_prime_rend"].ToString();
                    //Commerce
                    s.reg_commerce = dr["reg_commerce"].ToString();
                    s.taux_hs = float.Parse(dr["taux_hs"].ToString());
                    s.taux_hs1 = float.Parse(dr["taux_hs1"].ToString());
                    s.taux_hs2 = float.Parse(dr["taux_hs2"].ToString());


                }
                dr.Close();
                return s;
            }
            catch (Exception)
            {
                throw;
            }
        }



        [Route("societe/elementpaie/update/{id}")]
        [HttpPut]
        public IHttpActionResult updatedata([FromBody] Element_paie s, int id)
        {
            try
            {
                SqlConnection myConnection = new SqlConnection();
                myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandText = "Element_paie_update";
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                //CNSS
                sqlCmd.Parameters.AddWithValue("@cnss_cot_patronal", s.cnss_cot_patronal);
                sqlCmd.Parameters.AddWithValue("@cnss_cot_employe", s.cnss_cot_employe);
                sqlCmd.Parameters.AddWithValue("@cnss_acc_travail", s.cnss_acc_travail);
                sqlCmd.Parameters.AddWithValue("@cnss_regimec_employe", s.cnss_regimec_employe);
                sqlCmd.Parameters.AddWithValue("@cnss_regimec_patron", s.cnss_regimec_patron);
                sqlCmd.Parameters.AddWithValue("@cnss_medecin_travail", s.cnss_medecin_travail);
                //IMPOT
                sqlCmd.Parameters.AddWithValue("@irpp", s.irpp);
                sqlCmd.Parameters.AddWithValue("@tfp", s.tfp);
                sqlCmd.Parameters.AddWithValue("@foprolos", s.foprolos);
                //ASURRANCE
                sqlCmd.Parameters.AddWithValue("@assurance_numcontrat", s.assurance_numcontrat);
                sqlCmd.Parameters.AddWithValue("@assurance_tauxemploye", s.assurance_tauxemploye);
                sqlCmd.Parameters.AddWithValue("@assurance_tauxemployeur", s.assurance_tauxemployeur);
                sqlCmd.Parameters.AddWithValue("@assurance_imposition", s.assurance_imposition);
                sqlCmd.Parameters.AddWithValue("@assurance_compagnie", s.assurance_compagnie);
                sqlCmd.Parameters.AddWithValue("@assurance_datedebut", s.assurance_datedebut);
                sqlCmd.Parameters.AddWithValue("@assurance_type", s.assurance_type);
                sqlCmd.Parameters.AddWithValue("@assurance_datefin", s.assurance_datefin);
                //Gestion presence
                sqlCmd.Parameters.AddWithValue("@gestion_presence", s.gestion_presence);
                //Gesion paie selon calendrier 
                sqlCmd.Parameters.AddWithValue("@paie_calendrier", s.paie_calendrier);
                //Liquidation impot
                sqlCmd.Parameters.AddWithValue("@liquidation_impot", s.liquidation_impot);
                //Prime_Rendement
                sqlCmd.Parameters.AddWithValue("@prime_rend", s.prime_rend);
                sqlCmd.Parameters.AddWithValue("@mois_prime_rend", s.mois_prime_rend);
                sqlCmd.Parameters.AddWithValue("@periode_prime_rend", s.periode_prime_rend);
                //IRPP
                sqlCmd.Parameters.AddWithValue("@arrond_irpp", s.arrond_irpp);
                //Commerce
                sqlCmd.Parameters.AddWithValue("@reg_commerce", s.reg_commerce);
                sqlCmd.Parameters.AddWithValue("@taux_hs", s.taux_hs);
                sqlCmd.Parameters.AddWithValue("@taux_hs1", s.taux_hs1);
                sqlCmd.Parameters.AddWithValue("@taux_hs2", s.taux_hs2);

                //ID
                sqlCmd.Parameters.AddWithValue("@id", id);
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
