using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net.Http;
using System.Web.Http;
using BACKEND_GRH.Models;
namespace BACKEND_GRH.Controllers
{
     
    public class PaieController : ApiController
    {
        float salaire_Brute=0;
        float salaire_base;
        float net_social=0;
        float assiette_imposable=0;
        float assiette_impo=0;
        float cotisation=0;
        float salaire_imposable=0;
        float salaire_net=0;
        float contribution_patronale = 0;
        float irpp = 0;
        float montant_retneue = 0;
        float nb_j_t = 0;
        float nbr_heure_jour;
        float nbrjrs_absence = 0;
        int nb_j_f = 0;
        //gain 
        [Route("paie/employe/{matricule}/{exercice}/{mois}")]
        [HttpGet]
        public HttpResponseMessage Calcule_Salaire_brut(string matricule, int exercice, int mois)
        {


            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Paie_get_employe_societe";
            sqlCmd.Connection = myConnection;
            sqlCmd.Parameters.AddWithValue("@matricule", matricule);
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Parameters.AddWithValue("@mois", mois);
            List<bulletin_paie> Gain = new List<bulletin_paie>();
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            //Salaire Brute
            //verification 3ala mois +12

            if (mois <= 12||(mois>12 && (Equals(table.Rows[0]["base_calcul"].ToString(), "salaire net"))))
            {
                if (Equals(table.Rows[0]["gestion_presence"].ToString(), "presence"))
                {
                    nb_j_t = float.Parse(table.Rows[0]["nbrjm"].ToString());
                    nbr_heure_jour = (float)Math.Round(float.Parse(table.Rows[0]["nbrhm"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()), 3);

                    myConnection.Close();
                    myConnection.Open();           
                    sqlCmd.CommandText = "Absence_select_matricule";
                    SqlDataReader ab = sqlCmd.ExecuteReader();
                    //Méthode de l’horaire réel:salaire de base*(nb d'heures d'absence/nbhm)
                    while (ab.Read())
                    {

                        // Gain.Add(new bulletin_paie() { designation = "Absence " + ab["motif"].ToString(), retenue = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) * ((int.Parse(ab["nbr_jours"].ToString()) * nbr_heure_jour) / float.Parse(table.Rows[0]["nbrhm"].ToString()))), 3), nombre = int.Parse(ab["nbr_jours"].ToString()), montant = (float)Math.Round(float.Parse(table.Rows[0]["sal_base"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()), 3), type = "Brute" });
                        // salaire_Brute -= float.Parse(table.Rows[0]["sal_base"].ToString()) * ((int.Parse(ab["nbr_jours"].ToString()) * nbr_heure_jour) / float.Parse(table.Rows[0]["nbrhm"].ToString()));                  nbrjrs_absence += int.Parse(ab["nbr_jours"].ToString());
                        nbrjrs_absence += int.Parse(ab["nbr_jours"].ToString());
                    }
                    nb_j_t -= nbrjrs_absence;
                    //jour férié
                    myConnection.Close();
                    myConnection.Open();
                    sqlCmd.CommandText = "Calendrier_Matricule_Mois_exercice";
                    SqlDataReader jr = sqlCmd.ExecuteReader();
                    while (jr.Read())
                    {
                        nb_j_f++;
                        nb_j_t--;
                    }
                    myConnection.Close();
                    sqlCmd.CommandText = "conge_matricule";
                    myConnection.Open();
                    SqlDataReader nbconge = sqlCmd.ExecuteReader();
                    while (nbconge.Read())
                    {
                        nb_j_t-= (int.Parse(nbconge["nbr_jours"].ToString()));
                    }











                    salaire_base = float.Parse(table.Rows[0]["sal_base"].ToString());
                   
                    Gain.Add(new bulletin_paie() { designation = "Salaire de base:"+nb_j_t.ToString() + "Jours Eff.", gain = (float)Math.Round(salaire_base *(nb_j_t/ Convert.ToInt32(table.Rows[0]["nbrjm"].ToString())),3), montant = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) / Convert.ToInt32(table.Rows[0]["nbrjm"].ToString())),3), type = "Brute", nombre =nb_j_t, taux = 0 });
                }
                salaire_Brute = (float)Math.Round(salaire_base * (nb_j_t / Convert.ToInt32(table.Rows[0]["nbrjm"].ToString())), 3);


                if (nb_j_f>0) {
                    Gain.Add(new bulletin_paie() { designation = "Jour férié payé", gain = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) / Convert.ToInt32(table.Rows[0]["nbrjm"].ToString())) * nb_j_f, 3), nombre = nb_j_f, montant = (float)Math.Round(float.Parse(table.Rows[0]["sal_base"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()), 3), type = "Brute" });
                    salaire_Brute += (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) / Convert.ToInt32(table.Rows[0]["nbrjm"].ToString())) * nb_j_f, 3);

                }



                myConnection.Close();
                sqlCmd.CommandText = "conge_matricule";
                myConnection.Open();
                SqlDataReader conge = sqlCmd.ExecuteReader();
                while (conge.Read())
                {
                    Gain.Add(new bulletin_paie() { designation = "Indemnité congé payé", gain = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) * ((int.Parse(conge["nbr_jours"].ToString()) * nbr_heure_jour) / float.Parse(table.Rows[0]["nbrhm"].ToString()))), 3), nombre= int.Parse(conge["nbr_jours"].ToString()) , montant = (float)Math.Round(float.Parse(table.Rows[0]["sal_base"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()), 3), type = "Brute" });
                    salaire_Brute += (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) * ((int.Parse(conge["nbr_jours"].ToString()) * nbr_heure_jour) / float.Parse(table.Rows[0]["nbrhm"].ToString()))),3);
                }




                myConnection.Close();
                sqlCmd.CommandText = "Prime_select_paie";
                myConnection.Open();
                SqlDataReader prime = sqlCmd.ExecuteReader();
                while (prime.Read())
                {
                    float montant_prime = 0;
                    int nombre = 0;
                    if ((Convert.ToBoolean(prime["cotisable"])) && (Convert.ToBoolean(prime["imposable"])))
                    {


                        if (Equals(prime["type"].ToString(), "variable"))
                        {
                            if (!((Convert.ToBoolean(prime["toutourien"])) && (nbrjrs_absence > 0)))
                            {
                                //Calcule:salaire de base *taux/njm*nj_travaillé_m
                                if((Convert.ToBoolean(prime["proportionnelle"])))
                                {
                                    montant_prime = (float)Math.Round(((float.Parse(prime["sal_base"].ToString()) * float.Parse(prime["taux"].ToString()) / 100)/float.Parse(table.Rows[0]["nbrjm"].ToString())*(float.Parse(table.Rows[0]["nbrjm"].ToString())-nbrjrs_absence)),3);
                                    nombre= (int)(int.Parse(table.Rows[0]["nbrjm"].ToString())- nbrjrs_absence);
                                }
                                else
                                {
                                    montant_prime = (float)Math.Round(((float.Parse(prime["sal_base"].ToString()) * float.Parse(prime["taux"].ToString()) / 100)),3);
                                    nombre = 1;

                                }

                                if(montant_prime> float.Parse(prime["montant_max"].ToString()))
                                {
                                    montant_prime = float.Parse(prime["montant_max"].ToString());
                                }
                                else if (montant_prime < float.Parse(prime["montant_min"].ToString()))
                                {
                                    montant_prime = float.Parse(prime["montant_min"].ToString());
                                }

                                Gain.Add(new bulletin_paie() { designation = prime["rubrique"].ToString(), gain = montant_prime,taux= float.Parse(prime["taux"].ToString()),nombre=nombre,montant= float.Parse(prime["sal_base"].ToString()), type = "Brute" });
                                salaire_Brute += montant_prime;


                            }
                        }
                        else
                        {
                            if (!((Convert.ToBoolean(prime["toutourien"])) && (nbrjrs_absence > 0)))
                            {
                                if ((Convert.ToBoolean(prime["proportionnelle"])))
                                {
                                    montant_prime = (float)Math.Round((float.Parse(prime["montant_fixe"].ToString())/float.Parse(table.Rows[0]["nbrjm"].ToString())*(float.Parse(table.Rows[0]["nbrjm"].ToString())-nbrjrs_absence)),3);
                                    nombre = (int)(int.Parse(table.Rows[0]["nbrjm"].ToString()) - nbrjrs_absence);
                                }
                                else
                                {
                                    montant_prime = float.Parse(prime["montant_fixe"].ToString());
                                    nombre = 1;
                                }
                                if(montant_prime> float.Parse(prime["plafond"].ToString()))
                                {
                                    montant_prime = float.Parse(prime["plafond"].ToString());
                                }

                                Gain.Add(new bulletin_paie() { designation = prime["rubrique"].ToString(), gain = montant_prime,nombre=nombre,montant= float.Parse(prime["montant_fixe"].ToString()), type = "Brute" });
                                salaire_Brute += montant_prime;
                            }
                        }

                    }

                }



                myConnection.Close();
                myConnection.Open();
                sqlCmd.CommandText = "heures_supp_matricule";
                SqlDataReader hs = sqlCmd.ExecuteReader();
                while (hs.Read())
                {
                    if (float.Parse(hs["hs1_25"].ToString()) > 0)
                    {
                        Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 25%", gain = (float)(float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_25"].ToString()) * (1.25)), montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs1_25"].ToString()), taux = 25, type = "Brute" });
                        salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_25"].ToString()) * 1.25),3);
                    }
                    if (float.Parse(hs["hs1_5"].ToString()) > 0)
                    {
                        Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 50%", gain = (float)(float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_5"].ToString()) * (1.5)), montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs1_5"].ToString()), taux = 50, type = "Brute" });
                        salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_5"].ToString()) *1.5),3);
                    }
                    if (float.Parse(hs["hs1_75"].ToString()) > 0)
                    {
                        Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 75%", gain = ((float)((float.Parse(hs["taux_horaire"].ToString())) * (float.Parse(hs["hs1_75"].ToString())) * 1.75)), montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs1_75"].ToString()), taux = 75, type = "Brute" });
                        salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_75"].ToString()) * 1.75),3);
                    }
                    if (float.Parse(hs["hs1_4"].ToString()) > 0)
                    {
                        Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 40%", gain = (float)(float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs_1_4"].ToString()) * (1.4)), montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs_1_4"].ToString()), taux = 40, type = "Brute" });
                        salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs_1_4"].ToString()) * 1.4),3);
                    }
                    if (float.Parse(hs["hs2"].ToString()) > 0)
                    {
                        Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 200%", gain = float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs2"].ToString()) * 2, montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs_1_2"].ToString()), taux = 200, type = "Brute" });
                        salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs2"].ToString()) * 2),3);
                    }
                    if (float.Parse(hs["hs_nuit"].ToString()) > 0)
                    {
                        Gain.Add(new bulletin_paie()
                        {
                            designation = "heures supplémentaire nuit",
                            gain = (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs_nuit"].ToString()) * (1 + (75 / 100))),3)
                            ,
                            montant = float.Parse(hs["taux_horaire"].ToString()),
                            nombre = float.Parse(hs["hs_nuit"].ToString()),
                            taux = 75,
                            type = "Brute"
                        });
                        salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs_nuit"].ToString()) * 1.75),3);
                    }


                }
                myConnection.Close();
                //Arrondi
                myConnection.Close();
                myConnection.Open();
                sqlCmd.CommandText = "Arrondi_select";
                SqlDataReader arrondi = sqlCmd.ExecuteReader();
                while (arrondi.Read())
                {
                    Gain.Add(new bulletin_paie() { designation = "Ancien Arrondi", gain = float.Parse(arrondi["montant"].ToString()), type = "brute" });
                    salaire_Brute += float.Parse(arrondi["montant"].ToString());
                }


                //Cotisation
                 net_social = (float)Math.Round(salaire_Brute,3);
                 //vérification 3ala employé w ela cotisation patronale duplique liste 
                 //contribution employé
                 if (float.Parse(table.Rows[0]["cnss_cot_employe"].ToString()) > 0)
                 {
                     Gain.Add(new bulletin_paie() { designation = "Cotisation cnss", retenue = (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_cot_employe"].ToString())) / 100,3), montant= (float)Math.Round(salaire_Brute,3), type = "cotisation" , taux = float.Parse(table.Rows[0]["cnss_cot_employe"].ToString()) });
                     net_social -= (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_cot_employe"].ToString())) / 100,3);
                     cotisation += (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_cot_employe"].ToString())) / 100,3);
                 }
                 if (float.Parse(table.Rows[0]["cnss_acc_travail"].ToString()) > 0)
                 {
                     Gain.Add(new bulletin_paie() { designation = "Cotisation accident de travail", retenue = (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_acc_travail"].ToString())) / 100,3),  taux = float.Parse(table.Rows[0]["cnss_acc_travail"].ToString()), montant = (float)Math.Round(salaire_Brute, 3),type = "cotisation" });
                     net_social -= (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_acc_travail"].ToString())) / 10,3);
                     cotisation += (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_acc_travail"].ToString())) / 10,3);
                 }
                 if (float.Parse(table.Rows[0]["cnss_medecin_travail"].ToString()) > 0)
                 {
                     Gain.Add(new bulletin_paie() { designation = "Cotisation medecin de travail", retenue = (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_medecin_travail"].ToString())) / 100,3),  taux = float.Parse(table.Rows[0]["cnss_medecin_travail"].ToString()), montant = (float)Math.Round(salaire_Brute, 3), type = "cotisation" });


                     net_social -= (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_medecin_travail"].ToString())) / 100,3);
                     cotisation += (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_medecin_travail"].ToString())) / 100,3);
                 }
                 if (float.Parse(table.Rows[0]["cnss_regimec_employe"].ToString()) > 0)
                 {
                     Gain.Add(new bulletin_paie() { designation = "Régime complémentaire", retenue = (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_regimec_employe"].ToString())) / 100,3), taux = float.Parse(table.Rows[0]["cnss_regimec_employe"].ToString()), montant = (float)Math.Round(salaire_Brute, 3), type = "cotisation" });
                     net_social -= (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_regimec_employe"].ToString())) / 100,3);
                     cotisation += (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_regimec_employe"].ToString())) / 100,3);
                 }

                 //contribution patronale
                 //cnss
                 if (float.Parse(table.Rows[0]["cnss_cot_patronal"].ToString()) > 0)
                 {
                     Gain.Add(new bulletin_paie() { designation = "Contribution patronale", retenue = (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_cot_patronal"].ToString())) / 100,3),  taux = float.Parse(table.Rows[0]["cnss_cot_patronal"].ToString()), montant = (float)Math.Round(salaire_Brute, 3), type = "contribution patronale" });
                     contribution_patronale += (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_cot_patronal"].ToString())) / 100,3);
                 }
                 //régime complémentaire
                 if (float.Parse(table.Rows[0]["cnss_regimec_patron"].ToString()) > 0)
                 {
                     Gain.Add(new bulletin_paie() { designation = "Régime complémentaire contribution patronale", retenue = (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_regimec_patron"].ToString())) / 100,3), taux = float.Parse(table.Rows[0]["cnss_regimec_patron"].ToString()), montant = (float)Math.Round(salaire_Brute, 3), type = "contribution patronale" });
                     contribution_patronale += (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["cnss_regimec_patron"].ToString())) / 100,3);
                 }
                //Assurance groupe
                if (float.Parse(table.Rows[0]["assurance_tauxemployeur"].ToString()) > 0)
                {
                    if (Equals(table.Rows[0]["assurance_type"].ToString(), "salairebase"))
                    {
                        Gain.Add(new bulletin_paie() { designation = "Assurance groupe contribution patronale", retenue = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) * float.Parse(table.Rows[0]["assurance_tauxemployeur"].ToString())) / 100, 3), taux = float.Parse(table.Rows[0]["assurance_tauxemployeur"].ToString()), montant = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()))), type = "contribution patronale" });
                        contribution_patronale += (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["assurance_tauxemployeur"].ToString())) / 100, 3);

                    }
                    else
                    {
                        Gain.Add(new bulletin_paie() { designation = "Assurance groupe contribution patronale", retenue = (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["assurance_tauxemployeur"].ToString())) / 100, 3), taux = float.Parse(table.Rows[0]["assurance_tauxemployeur"].ToString()), montant = (float)Math.Round(salaire_Brute, 3), type = "contribution patronale" });
                        contribution_patronale += (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["assurance_tauxemployeur"].ToString())) / 100, 3);

                    }

                }


                 salaire_imposable = net_social;

                 //Impot_deduction frais prof et chef de famille

                 assiette_imposable = net_social * 12;
                 float frais_prof;
                 frais_prof = (float)Math.Round((assiette_imposable * float.Parse(table.Rows[0]["taux_frais_prof"].ToString())) / 100,3);
                 if (frais_prof < 2000)
                 {
                     assiette_imposable -= frais_prof;
                 }
                 else
                 {
                     assiette_imposable -= 2000;
                 }

                 if ((Convert.ToBoolean(table.Rows[0]["cheffamille"].ToString())))
                 {
                     //assiette_imposable -= float.Parse(table.Rows[0]["chef_famille"].ToString());
                     sqlCmd.CommandText = "enfant_matricule";
                     myConnection.Close();
                     myConnection.Open();
                     SqlDataReader enfants = sqlCmd.ExecuteReader();
                     while (enfants.Read())
                     {
                         if ((Convert.ToBoolean(enfants["encharge"].ToString())))
                         {
                             assiette_imposable -= float.Parse(table.Rows[0]["enfant1"].ToString());
                         }
                         if ((Convert.ToBoolean(enfants["infirme"].ToString())))
                         {
                             assiette_imposable -= float.Parse(table.Rows[0]["enfant_infirme"].ToString());

                         }
                         if ((Convert.ToBoolean(enfants["etudiant"].ToString())))
                         {
                             assiette_imposable -= float.Parse(table.Rows[0]["enfant_sans_bourse"].ToString());
                         }

                     }
                 }
                
              
                 assiette_impo = assiette_imposable;
                 myConnection.Close();
                 if (float.Parse(table.Rows[0]["irpp"].ToString())>0)
                 {
                     if (assiette_imposable > float.Parse(table.Rows[0]["tranche6"].ToString()))
                     {
                         irpp += (float)Math.Round(((assiette_imposable - float.Parse(table.Rows[0]["tranche6"].ToString())) * float.Parse(table.Rows[0]["taux_tranche6"].ToString())) / 100,3);
                         assiette_imposable = assiette_imposable - float.Parse(table.Rows[0]["tranche6"].ToString());
                     }
                     if (assiette_imposable > float.Parse(table.Rows[0]["tranche5"].ToString()) && assiette_imposable <= float.Parse(table.Rows[0]["tranche6"].ToString()))
                     {
                         irpp += (float)Math.Round(((assiette_imposable - float.Parse(table.Rows[0]["tranche5"].ToString())) * float.Parse(table.Rows[0]["taux_tranche6"].ToString())) / 100,3);
                         assiette_imposable = assiette_imposable - float.Parse(table.Rows[0]["tranche5"].ToString());
                     }
                     if (assiette_imposable > float.Parse(table.Rows[0]["tranche4"].ToString()) && assiette_imposable <= float.Parse(table.Rows[0]["tranche5"].ToString()))
                     {
                         irpp += (float)Math.Round(((assiette_imposable - float.Parse(table.Rows[0]["tranche4"].ToString())) * float.Parse(table.Rows[0]["taux_tranche5"].ToString())) / 100,3);
                         assiette_imposable = assiette_imposable - float.Parse(table.Rows[0]["tranche4"].ToString());
                     }

                     if (assiette_imposable > float.Parse(table.Rows[0]["tranche3"].ToString()) && assiette_imposable <= float.Parse(table.Rows[0]["tranche4"].ToString()))
                     {
                         irpp += (float)Math.Round(((assiette_imposable - float.Parse(table.Rows[0]["tranche3"].ToString())) * float.Parse(table.Rows[0]["taux_tranche4"].ToString())) / 100,3);
                         assiette_imposable = assiette_imposable - float.Parse(table.Rows[0]["tranche3"].ToString());
                     }
                     if (assiette_imposable > float.Parse(table.Rows[0]["tranche2"].ToString()) && assiette_imposable <= float.Parse(table.Rows[0]["tranche3"].ToString()))
                     {
                         irpp += (float)Math.Round(((assiette_imposable - float.Parse(table.Rows[0]["tranche2"].ToString())) * float.Parse(table.Rows[0]["taux_tranche3"].ToString())) / 100,3);
                         assiette_imposable = assiette_imposable - float.Parse(table.Rows[0]["tranche2"].ToString());
                     }
                     if (assiette_imposable > float.Parse(table.Rows[0]["tranche1"].ToString()) && assiette_imposable <= float.Parse(table.Rows[0]["tranche2"].ToString()))
                     {
                         irpp += (float)Math.Round(((assiette_imposable - float.Parse(table.Rows[0]["tranche1"].ToString())) * float.Parse(table.Rows[0]["taux_tranche2"].ToString())) / 100,3);
                         assiette_imposable = assiette_imposable - float.Parse(table.Rows[0]["tranche1"].ToString());
                     }
                     if (assiette_imposable <= float.Parse(table.Rows[0]["tranche1"].ToString()))
                     {
                         assiette_imposable = assiette_imposable - float.Parse(table.Rows[0]["tranche1"].ToString());
                     }

                     Gain.Add(new bulletin_paie() { designation = "IRPP", retenue = (float)Math.Round(irpp / 12,3), montant = assiette_imposable, taux = float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString()), type = "impot" });
                     net_social -= (float)Math.Round(irpp / 12,3);
                 }
                 //assurance
                 if (Equals(table.Rows[0]["assurance_type"].ToString(), "salairebase"))
                 {
                     Gain.Add(new bulletin_paie() { designation = "Retenue assurance groupe", retenue = (float.Parse(table.Rows[0]["sal_base"].ToString()) * float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString())) / 100, montant = (float)Math.Round(float.Parse(table.Rows[0]["sal_base"].ToString()),3), taux = float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString()), type = "impot" });
                     net_social -= (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) * float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString())) / 100,3);
                 }
                 else
                 {
                     Gain.Add(new bulletin_paie() { designation = "Retenue assurance groupe", retenue = (salaire_Brute * float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString())) / 100, montant = salaire_Brute, taux = float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString()), type = "impot" });
                     net_social -= (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString())) / 100,3);
                 }

                 //bech nzidha fel base verif ccs //a vérifier 
                 Gain.Add(new bulletin_paie() { designation = "Contribution sociale de solidarité 1%", retenue = (float)Math.Round(((assiette_impo * 1) / 100) / 12,3), montant = (float)Math.Round(assiette_imposable / 12,3), taux = 1, type = "impot" });
                 net_social -= ((assiette_imposable * 1) / 100) / 12;
                 if (float.Parse(table.Rows[0]["tfp"].ToString()) > 0)
                 {
                     Gain.Add(new bulletin_paie() { designation = "tfp", retenue = (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["tfp"].ToString())) / 100,3), taux = float.Parse(table.Rows[0]["tfp"].ToString()), type = "impot" });
                     net_social -= (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["tfp"].ToString())) / 100,3);
                 }
                 if (float.Parse(table.Rows[0]["foprolos"].ToString()) > 0)
                 {
                     Gain.Add(new bulletin_paie() { designation = "tfp", retenue = (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["foprolos"].ToString())) / 100,3), taux = float.Parse(table.Rows[0]["foprolos"].ToString()), type = "impot" });
                     net_social -= (float)Math.Round((salaire_Brute * float.Parse(table.Rows[0]["foprolos"].ToString())) / 100,3);
                 }

                //salaire net apres cotisation et impot
                salaire_net = (float)Math.Round(net_social, 3);
                //indemnité !fopropos!cotisable!.....
                myConnection.Close();
                sqlCmd.CommandText = "Prime_select_paie";
                myConnection.Open();
                SqlDataReader prime_r = sqlCmd.ExecuteReader();
                while (prime_r.Read())
                {
                    float montant_prime = 0;
                    int nombre = 0;
                    if (!(Convert.ToBoolean(prime_r["cotisable"])) && !(Convert.ToBoolean(prime_r["imposable"]))&&!(Convert.ToBoolean(prime_r["tfp"])) && !(Convert.ToBoolean(prime_r["assurance_groupe"])) && !(Convert.ToBoolean(prime_r["foprolos"])) && !(Convert.ToBoolean(prime_r["medecine_travail"])))
                    {


                        if (Equals(prime_r["type"].ToString(), "variable"))
                        {
                            if (!((Convert.ToBoolean(prime_r["toutourien"])) && (nbrjrs_absence > 0)))
                            {
                                //Calcule:salaire de base *taux/njm*nj_travaillé_m
                                if ((Convert.ToBoolean(prime_r["proportionnelle"])))
                                {
                                    montant_prime = (float)Math.Round(((float.Parse(prime_r["sal_base"].ToString()) * float.Parse(prime_r["taux"].ToString()) / 100) / float.Parse(table.Rows[0]["nbrjm"].ToString()) * (float.Parse(table.Rows[0]["nbrjm"].ToString()) - nbrjrs_absence)), 3);
                                    nombre = (int)(int.Parse(table.Rows[0]["nbrjm"].ToString()) - nbrjrs_absence);
                                }
                                else
                                {
                                    montant_prime = (float)Math.Round(((float.Parse(prime_r["sal_base"].ToString()) * float.Parse(prime_r["taux"].ToString()) / 100)), 3);
                                    nombre = 1;

                                }

                                if (montant_prime > float.Parse(prime_r["montant_max"].ToString()))
                                {
                                    montant_prime = float.Parse(prime_r["montant_max"].ToString());
                                }
                                else if (montant_prime < float.Parse(prime_r["montant_min"].ToString()))
                                {
                                    montant_prime = float.Parse(prime_r["montant_min"].ToString());
                                }

                                Gain.Add(new bulletin_paie() { designation = prime_r["rubrique"].ToString(), gain = montant_prime, taux = float.Parse(prime_r["taux"].ToString()), nombre = nombre, montant = float.Parse(prime_r["sal_base"].ToString()), type = "Indemnite retenue" });
                                salaire_net += montant_prime;


                            }
                        }
                        else
                        {
                            if (!((Convert.ToBoolean(prime_r["toutourien"])) && (nbrjrs_absence > 0)))
                            {
                                if ((Convert.ToBoolean(prime_r["proportionnelle"])))
                                {
                                    montant_prime = (float)Math.Round((float.Parse(prime_r["montant_fixe"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()) * (float.Parse(table.Rows[0]["nbrjm"].ToString()) - nbrjrs_absence)), 3);
                                    nombre = (int)(int.Parse(table.Rows[0]["nbrjm"].ToString()) - nbrjrs_absence);
                                }
                                else
                                {
                                    montant_prime = float.Parse(prime_r["montant_fixe"].ToString());
                                    nombre = 1;
                                }
                                if (montant_prime > float.Parse(prime_r["plafond"].ToString()))
                                {
                                    montant_prime = float.Parse(prime_r["plafond"].ToString());
                                }

                                Gain.Add(new bulletin_paie() { designation = prime_r["rubrique"].ToString(), gain = montant_prime, nombre = nombre, montant = float.Parse(prime_r["montant_fixe"].ToString()), type = "Indemnite retenue" });
                                salaire_net += montant_prime;
                            }
                        }

                    }

                }
                
                Gain.Add(new bulletin_paie() { designation = "Salaire net", gain = (float)Math.Round(salaire_net, 3), type = "retenue" });


                //avance
                sqlCmd.CommandText = "Avance_matricule";
                 myConnection.Close();
                 myConnection.Open();
                 SqlDataReader avance = sqlCmd.ExecuteReader();
                 while (avance.Read())
                 {
                     Gain.Add(new bulletin_paie() { designation = avance["type"].ToString(), retenue = float.Parse(avance["montant"].ToString()), type = "retenue" });
                     salaire_net -= (float)Math.Round(float.Parse(avance["montant"].ToString()),3);
                    montant_retneue+= (float)Math.Round(float.Parse(avance["montant"].ToString()), 3);
                }
                //retenue
                sqlCmd.CommandText = "Retenue_matricule";
                myConnection.Close();
                myConnection.Open();
                SqlDataReader retenue = sqlCmd.ExecuteReader();
                while (retenue.Read())
                {
                    Gain.Add(new bulletin_paie() { designation = retenue["designation"].ToString(), retenue = (float)Math.Round(float.Parse(retenue["montant"].ToString()),3), type = "retenue" });
                    salaire_net -= (float)Math.Round(float.Parse(retenue["montant"].ToString()),3);
                    montant_retneue += (float)Math.Round(float.Parse(retenue["montant"].ToString()), 3);
                }





                sqlCmd.CommandText = "Pret_matricule";
                 myConnection.Close();
                 myConnection.Open();
                 SqlDataReader prets = sqlCmd.ExecuteReader();
                 while (prets.Read())
                 {
                     Gain.Add(new bulletin_paie() { designation = "Prêt", retenue = (float)Math.Round(float.Parse(prets["montant_echeance"].ToString()),3), type = "retenue" });
                     salaire_net -= (float)Math.Round(float.Parse(prets["montant_echeance"].ToString()),3);
                    montant_retneue += (float)Math.Round(float.Parse(prets["montant_echeance"].ToString()), 3);
                }
                 //Arrondi
                 SqlCommand sqlarrondi = new SqlCommand();
                 sqlarrondi.CommandType = CommandType.StoredProcedure;
                 sqlarrondi.CommandText = "Arrondi_insert";
                 myConnection.Close();
                 myConnection.Open();
                 sqlarrondi.Connection = myConnection;
                 sqlarrondi.Parameters.AddWithValue("@montant", salaire_net - (float)Math.Floor(salaire_net));
                 sqlarrondi.Parameters.AddWithValue("@exercice", exercice);
                 sqlarrondi.Parameters.AddWithValue("@mois ", mois);
                 sqlarrondi.Parameters.AddWithValue("@matricule", matricule);
                 sqlarrondi.ExecuteNonQuery();
                montant_retneue += (float)Math.Round(salaire_net - (float)Math.Floor(salaire_net), 3);
                myConnection.Close();
                 Gain.Add(new bulletin_paie() { designation = "Nouvel arrondi", retenue = (float)Math.Round(salaire_net - (float)Math.Floor(salaire_net),3), type = "retenue" });
                 myConnection.Close();
                 //salaire net
                 salaire_net = (float)Math.Floor(salaire_net);
                 Gain.Add(new bulletin_paie() { designation = "Net à payer", gain = salaire_net, type = "retenue" });
               }
             else if ((Equals(table.Rows[0]["base_calcul"].ToString(), "salaire brut")))
                 {
                    if (Equals(table.Rows[0]["gestion_presence"].ToString(), "presence"))
                    {
                        salaire_base = float.Parse(table.Rows[0]["sal_base"].ToString());
                        salaire_Brute = salaire_base;
                        Gain.Add(new bulletin_paie() { designation = "Salaire de base", gain = float.Parse(table.Rows[0]["sal_base"].ToString()), montant = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) / Convert.ToInt32(table.Rows[0]["nbrhm"].ToString())), 3), type = "Brute", nombre = Convert.ToInt32(table.Rows[0]["nbrhm"].ToString()), taux = 0 });
                    }

                    myConnection.Close();
                    myConnection.Open();
                    float nbrjrs_absence = 0;
                    float nbr_heure_jour = (float)Math.Round(float.Parse(table.Rows[0]["nbrhm"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()), 2);
                    sqlCmd.CommandText = "Absence_select_matricule";
                    SqlDataReader ab = sqlCmd.ExecuteReader();
                    //Méthode de l’horaire réel:salaire de base*(nb d'heures d'absence/nbhm)
                    while (ab.Read())
                    {

                        Gain.Add(new bulletin_paie() { designation = "Absence " + ab["motif"].ToString(), retenue = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) * ((int.Parse(ab["nbr_jours"].ToString()) * nbr_heure_jour) / float.Parse(table.Rows[0]["nbrhm"].ToString()))), 3), nombre = int.Parse(ab["nbr_jours"].ToString()), montant = (float)Math.Round(float.Parse(table.Rows[0]["sal_base"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()), 3), type = "Brute" });
                        salaire_Brute -= float.Parse(table.Rows[0]["sal_base"].ToString()) * ((int.Parse(ab["nbr_jours"].ToString()) * nbr_heure_jour) / float.Parse(table.Rows[0]["nbrhm"].ToString()));
                        nbrjrs_absence += int.Parse(ab["nbr_jours"].ToString());

                    }
                    myConnection.Close();
                    sqlCmd.CommandText = "conge_matricule";
                    myConnection.Open();
                    SqlDataReader conge = sqlCmd.ExecuteReader();
                    while (conge.Read())
                    {
                        Gain.Add(new bulletin_paie() { designation = "Indemnité congé payé", gain = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) * ((int.Parse(conge["nbr_jours"].ToString()) * nbr_heure_jour) / float.Parse(table.Rows[0]["nbrhm"].ToString()))), 3), nombre = int.Parse(conge["nbr_jours"].ToString()), montant = (float)Math.Round(float.Parse(table.Rows[0]["sal_base"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()), 3), type = "Brute" });
                        salaire_Brute += (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) * ((int.Parse(conge["nbr_jours"].ToString()) * nbr_heure_jour) / float.Parse(table.Rows[0]["nbrhm"].ToString()))), 3);
                    }




                    myConnection.Close();
                    sqlCmd.CommandText = "Prime_select_paie";
                    myConnection.Open();
                    SqlDataReader prime = sqlCmd.ExecuteReader();
                    while (prime.Read())
                    {
                        float montant_prime = 0;
                        if ((Convert.ToBoolean(prime["cotisable"])) && (Convert.ToBoolean(prime["imposable"])))
                        {


                            if (Equals(prime["type"].ToString(), "variable"))
                            {
                                if (!((Convert.ToBoolean(prime["toutourien"])) && (nbrjrs_absence > 0)))
                                {
                                    //Calcule:salaire de base *taux/njm*nj_travaillé_m
                                    if ((Convert.ToBoolean(prime["proportionnelle"])))
                                    {
                                        montant_prime = (float)Math.Round(((float.Parse(prime["sal_base"].ToString()) * float.Parse(prime["taux"].ToString()) / 100) / float.Parse(table.Rows[0]["nbrjm"].ToString()) * (float.Parse(table.Rows[0]["nbrjm"].ToString()) - nbrjrs_absence)), 3);

                                    }
                                    else
                                    {
                                        montant_prime = (float)Math.Round(((float.Parse(prime["sal_base"].ToString()) * float.Parse(prime["taux"].ToString()) / 100)), 3);

                                    }

                                    if (montant_prime > float.Parse(prime["montant_max"].ToString()))
                                    {
                                        montant_prime = float.Parse(prime["montant_max"].ToString());
                                    }
                                    else if (montant_prime < float.Parse(prime["montant_min"].ToString()))
                                    {
                                        montant_prime = float.Parse(prime["montant_min"].ToString());
                                    }

                                    Gain.Add(new bulletin_paie() { designation = prime["rubrique"].ToString(), gain = montant_prime, type = "Brute" });
                                    salaire_Brute += montant_prime;


                                }
                            }
                            else
                            {
                                if (!((Convert.ToBoolean(prime["toutourien"])) && (nbrjrs_absence > 0)))
                                {
                                    if ((Convert.ToBoolean(prime["proportionnelle"])))
                                    {
                                        montant_prime = (float)Math.Round((float.Parse(prime["montant_fixe"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()) * (float.Parse(table.Rows[0]["nbrjm"].ToString()) - nbrjrs_absence)), 3);
                                    }
                                    else
                                    {
                                        montant_prime = float.Parse(prime["montant_fixe"].ToString());
                                    }
                                    if (montant_prime > float.Parse(prime["plafond"].ToString()))
                                    {
                                        montant_prime = float.Parse(prime["plafond"].ToString());
                                    }

                                    Gain.Add(new bulletin_paie() { designation = prime["rubrique"].ToString(), gain = montant_prime, type = "Brute" });
                                    salaire_Brute += montant_prime;
                                }
                            }

                        }

                    }



                    myConnection.Close();
                    myConnection.Open();
                    sqlCmd.CommandText = "heures_supp_matricule";
                    SqlDataReader hs = sqlCmd.ExecuteReader();
                    while (hs.Read())
                    {
                        if (float.Parse(hs["hs1_25"].ToString()) > 0)
                        {
                            Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 25%", gain = (float)(float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_25"].ToString()) * (1.25)), montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs1_25"].ToString()), taux = 25, type = "Brute" });
                            salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_25"].ToString()) * 1.25), 3);
                        }
                        if (float.Parse(hs["hs1_5"].ToString()) > 0)
                        {
                            Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 50%", gain = (float)(float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_5"].ToString()) * (1.5)), montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs1_5"].ToString()), taux = 50, type = "Brute" });
                            salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_5"].ToString()) * 1.5), 3);
                        }
                        if (float.Parse(hs["hs1_75"].ToString()) > 0)
                        {
                            Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 75%", gain = ((float)((float.Parse(hs["taux_horaire"].ToString())) * (float.Parse(hs["hs1_75"].ToString())) * 1.75)), montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs1_75"].ToString()), taux = 75, type = "Brute" });
                            salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs1_75"].ToString()) * 1.75), 3);
                        }
                        if (float.Parse(hs["hs1_4"].ToString()) > 0)
                        {
                            Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 40%", gain = (float)(float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs_1_4"].ToString()) * (1.4)), montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs_1_4"].ToString()), taux = 40, type = "Brute" });
                            salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs_1_4"].ToString()) * 1.4), 3);
                        }
                        if (float.Parse(hs["hs2"].ToString()) > 0)
                        {
                            Gain.Add(new bulletin_paie() { designation = "heures supplémentaire 200%", gain = float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs2"].ToString()) * 2, montant = float.Parse(hs["taux_horaire"].ToString()), nombre = float.Parse(hs["hs_1_2"].ToString()), taux = 200, type = "Brute" });
                            salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs2"].ToString()) * 2), 3);
                        }
                        if (float.Parse(hs["hs_nuit"].ToString()) > 0)
                        {
                            Gain.Add(new bulletin_paie()
                            {
                                designation = "heures supplémentaire nuit",
                                gain = (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs_nuit"].ToString()) * (1 + (75 / 100))), 3)
                                ,
                                montant = float.Parse(hs["taux_horaire"].ToString()),
                                nombre = float.Parse(hs["hs_nuit"].ToString()),
                                taux = 75,
                                type = "Brute"
                            });
                            salaire_Brute += (float)Math.Round((float.Parse(hs["taux_horaire"].ToString()) * float.Parse(hs["hs_nuit"].ToString()) * 1.75), 3);
                        }


                    }
                    myConnection.Close();
                    //Arrondi
                    myConnection.Close();
                    myConnection.Open();
                    sqlCmd.CommandText = "Arrondi_select";
                    SqlDataReader arrondi = sqlCmd.ExecuteReader();
                    while (arrondi.Read())
                    {
                        Gain.Add(new bulletin_paie() { designation = "Ancien Arrondi", gain = float.Parse(arrondi["montant"].ToString()), type = "brute" });
                        salaire_Brute += float.Parse(arrondi["montant"].ToString());
                    }



                }
                else if ((Equals(table.Rows[0]["base_calcul"].ToString(), "indemnités")))
                 {
                   /* myConnection.Close();
                    sqlCmd.CommandText = "Prime_select_paie";
                    myConnection.Open();
                    SqlDataReader prime = sqlCmd.ExecuteReader();
                    while (prime.Read())
                    {
                        float montant_prime = 0;
                        if ((Convert.ToBoolean(prime["cotisable"])) && (Convert.ToBoolean(prime["imposable"])))
                        {


                            if (Equals(prime["type"].ToString(), "variable"))
                            {
                                if (!((Convert.ToBoolean(prime["toutourien"])) && (nbrjrs_absence > 0)))
                                {
                                    //Calcule:salaire de base *taux/njm*nj_travaillé_m
                                    if ((Convert.ToBoolean(prime["proportionnelle"])))
                                    {
                                        montant_prime = (float)Math.Round(((float.Parse(prime["sal_base"].ToString()) * float.Parse(prime["taux"].ToString()) / 100) / float.Parse(table.Rows[0]["nbrjm"].ToString()) * (float.Parse(table.Rows[0]["nbrjm"].ToString()) - nbrjrs_absence)), 3);

                                    }
                                    else
                                    {
                                        montant_prime = (float)Math.Round(((float.Parse(prime["sal_base"].ToString()) * float.Parse(prime["taux"].ToString()) / 100)), 3);

                                    }

                                    if (montant_prime > float.Parse(prime["montant_max"].ToString()))
                                    {
                                        montant_prime = float.Parse(prime["montant_max"].ToString());
                                    }
                                    else if (montant_prime < float.Parse(prime["montant_min"].ToString()))
                                    {
                                        montant_prime = float.Parse(prime["montant_min"].ToString());
                                    }

                                    Gain.Add(new bulletin_paie() { designation = prime["rubrique"].ToString(), gain = montant_prime, type = "Brute" });
                                    salaire_Brute += montant_prime;


                                }
                            }
                            else
                            {
                                if (!((Convert.ToBoolean(prime["toutourien"])) && (nbrjrs_absence > 0)))
                                {
                                    if ((Convert.ToBoolean(prime["proportionnelle"])))
                                    {
                                        montant_prime = (float)Math.Round((float.Parse(prime["montant_fixe"].ToString()) / float.Parse(table.Rows[0]["nbrjm"].ToString()) * (float.Parse(table.Rows[0]["nbrjm"].ToString()) - nbrjrs_absence)), 3);
                                    }
                                    else
                                    {
                                        montant_prime = float.Parse(prime["montant_fixe"].ToString());
                                    }
                                    if (montant_prime > float.Parse(prime["plafond"].ToString()))
                                    {
                                        montant_prime = float.Parse(prime["plafond"].ToString());
                                    }

                                    Gain.Add(new bulletin_paie() { designation = prime["rubrique"].ToString(), gain = montant_prime, type = "Brute" });
                                    salaire_Brute += montant_prime;
                                }
                            }

                        }

                    }*/

                }
                 else
                 {
                    salaire_base = float.Parse(table.Rows[0]["sal_base"].ToString());
                    Gain.Add(new bulletin_paie() { designation = "Salaire de base", gain = float.Parse(table.Rows[0]["sal_base"].ToString()), montant = (float)Math.Round((float.Parse(table.Rows[0]["sal_base"].ToString()) / Convert.ToInt32(table.Rows[0]["nbrhm"].ToString())), 3), type = "Brute", nombre = Convert.ToInt32(table.Rows[0]["nbrhm"].ToString()), taux = 0 });
                    salaire_Brute = salaire_base;
                    salaire_imposable = salaire_base;
                     salaire_net= salaire_base;


            }

            


            










            //table bordereau de paie de chaque employé
              SqlCommand sqlCmddd = new SqlCommand();
              sqlCmddd.CommandType = CommandType.StoredProcedure;
              sqlCmddd.CommandText = "Paie_add";
              sqlCmddd.Connection = myConnection;
              myConnection.Open();
              sqlCmddd.Parameters.AddWithValue("@salaire_base", (float)Math.Round(salaire_base,3) );
              sqlCmddd.Parameters.AddWithValue("@salaire_brut", (float)Math.Round(salaire_Brute,3));
              sqlCmddd.Parameters.AddWithValue("@cotisation", (float)Math.Round(cotisation,3));
              sqlCmddd.Parameters.AddWithValue("@salaire_imposable", (float)Math.Round(salaire_imposable,3));
              sqlCmddd.Parameters.AddWithValue("@irpp", (float)Math.Round(irpp,3));
              sqlCmddd.Parameters.AddWithValue("@cot_pat ", contribution_patronale);
              sqlCmddd.Parameters.AddWithValue("@net_payer ", (float)Math.Round(salaire_net,3));
              sqlCmddd.Parameters.AddWithValue("@salaire_net ", (float)Math.Round(net_social, 3));
            sqlCmddd.Parameters.AddWithValue("@montant_retenue ", (float)Math.Round(montant_retneue, 3));
            sqlCmddd.Parameters.AddWithValue("@matricule", matricule);
              sqlCmddd.Parameters.AddWithValue("@exercice", exercice);
              sqlCmddd.Parameters.AddWithValue("@mois", mois);
              sqlCmddd.ExecuteNonQuery();
              myConnection.Close();


              //table élements
              foreach (bulletin_paie element in Gain)
              {
                  SqlCommand sqlCmdd = new SqlCommand();
                  sqlCmdd.CommandType = CommandType.StoredProcedure;
                  sqlCmdd.CommandText = "Bulletin_paie_add";
                  sqlCmdd.Connection = myConnection;
                  myConnection.Open();
                  sqlCmdd.Parameters.AddWithValue("@designation", element.designation);
                  sqlCmdd.Parameters.AddWithValue("@type", element.type);
                  sqlCmdd.Parameters.AddWithValue("@nombre", element.nombre);
                  sqlCmdd.Parameters.AddWithValue("@taux", element.taux);
                  sqlCmdd.Parameters.AddWithValue("@base", element.montant);
                  sqlCmdd.Parameters.AddWithValue("@gain", element.gain);
                  sqlCmdd.Parameters.AddWithValue("@retenue", element.retenue);
                  sqlCmdd.Parameters.AddWithValue("@matricule", matricule);
                  sqlCmdd.Parameters.AddWithValue("@exercice", exercice);
                  sqlCmdd.Parameters.AddWithValue("@mois", mois);
                  sqlCmdd.ExecuteNonQuery();
                  myConnection.Close();
              }

            return Request.CreateResponse(HttpStatusCode.OK, Gain);
        }


        //suppression
        [Route("paie/delete/{id}")]
        [HttpDelete]
        public IHttpActionResult delete(int id)
        {

            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Paie_delete";
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




        /* //impot ,taxe et assurance groupe //contribution sociale de solidarité 1%  
         [Route("paie/employe/impot/{matricule}/{exercice}/{mois}")]
         [HttpGet]
         public HttpResponseMessage Calcule_impot(string matricule, int exercice, int mois)
         {
             float irpp=0;
             DataTable table = new DataTable();
             assiette_imposable = salaire_Brute*12;
             SqlConnection myConnection = new SqlConnection();
             myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
             SqlCommand sqlCmd = new SqlCommand();
             sqlCmd.CommandType = CommandType.StoredProcedure;
             sqlCmd.CommandText = "Paie_get_employe_societe";
             sqlCmd.Connection = myConnection;
             sqlCmd.Parameters.AddWithValue("@matricule", matricule);
             sqlCmd.Parameters.AddWithValue("@exercice", exercice);
             List<bulletin_paie> impot = new List<bulletin_paie>();
             SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
             da.Fill(table);
             float frais_prof;
             frais_prof = (assiette_imposable * 10) / 100;
             if (frais_prof < 2000)
             {
                 assiette_imposable -= frais_prof;
             }
             else
             {
                 assiette_imposable -= 2000;
             }

             if ((Convert.ToBoolean(table.Rows[0]["cheffamille"].ToString()))){
                 //assiette_imposable -= float.Parse(table.Rows[0]["chef_famille"].ToString());
                 sqlCmd.CommandText = "enfant_matricule";
                  myConnection.Close();
                 myConnection.Open();
                SqlDataReader enfants = sqlCmd.ExecuteReader();
                 while (enfants.Read())
                 {
                     if ((Convert.ToBoolean(enfants["encharge"].ToString())))
                     {
                         assiette_imposable -= float.Parse(table.Rows[0]["enfant1"].ToString());
                     }
                     if ((Convert.ToBoolean(enfants["infirme"].ToString())))
                     {
                         assiette_imposable -= float.Parse(table.Rows[0]["enfant_infirme"].ToString());

                     }
                     if ((Convert.ToBoolean(enfants["etudiant"].ToString())))
                     {
                         assiette_imposable -= float.Parse(table.Rows[0]["enfant_sans_bourse"].ToString());
                     }

                 }
                 }

             if (float.Parse(table.Rows[0]["irpp"].ToString()) > 0)
             {
                 if (assiette_imposable > float.Parse(table.Rows[0]["tranche6"].ToString()))
                 {
                     irpp += ((assiette_imposable - float.Parse(table.Rows[0]["tranche6"].ToString())) * float.Parse(table.Rows[0]["taux_tranche6"].ToString())) / 100;
                     assiette_imposable-= assiette_imposable- float.Parse(table.Rows[0]["tranche6"].ToString());
                 }
                 if (assiette_imposable > float.Parse(table.Rows[0]["tranche5"].ToString())&& assiette_imposable <= float.Parse(table.Rows[0]["tranche6"].ToString()))
                 {
                     irpp += ((assiette_imposable - float.Parse(table.Rows[0]["tranche5"].ToString())) * float.Parse(table.Rows[0]["taux_tranche6"].ToString())) / 100;
                     assiette_imposable -= assiette_imposable - float.Parse(table.Rows[0]["tranche5"].ToString());
                 }
                 if (assiette_imposable > float.Parse(table.Rows[0]["tranche4"].ToString()) && assiette_imposable <= float.Parse(table.Rows[0]["tranche5"].ToString()))
                 {
                     irpp += ((assiette_imposable - float.Parse(table.Rows[0]["tranche4"].ToString())) * float.Parse(table.Rows[0]["taux_tranche5"].ToString())) / 100;
                     assiette_imposable -= assiette_imposable - float.Parse(table.Rows[0]["tranche4"].ToString());
                 }

                 if (assiette_imposable > float.Parse(table.Rows[0]["tranche3"].ToString()) && assiette_imposable <= float.Parse(table.Rows[0]["tranche4"].ToString()))
                 {
                     irpp += ((assiette_imposable - float.Parse(table.Rows[0]["tranche3"].ToString())) * float.Parse(table.Rows[0]["taux_tranche4"].ToString())) / 100;
                     assiette_imposable -= assiette_imposable - float.Parse(table.Rows[0]["tranche3"].ToString());
                 }
                 if (assiette_imposable > float.Parse(table.Rows[0]["tranche2"].ToString()) && assiette_imposable <= float.Parse(table.Rows[0]["tranche3"].ToString()))
                 {
                     irpp += ((assiette_imposable - float.Parse(table.Rows[0]["tranche2"].ToString())) * float.Parse(table.Rows[0]["taux_tranche3"].ToString())) / 100;
                     assiette_imposable -= assiette_imposable - float.Parse(table.Rows[0]["tranche2"].ToString());
                 }
                 if (assiette_imposable > float.Parse(table.Rows[0]["tranche1"].ToString()) && assiette_imposable <= float.Parse(table.Rows[0]["tranche2"].ToString()))
                 {
                     irpp += ((assiette_imposable - float.Parse(table.Rows[0]["tranche1"].ToString())) * float.Parse(table.Rows[0]["taux_tranche2"].ToString())) / 100;
                     assiette_imposable -= assiette_imposable - float.Parse(table.Rows[0]["tranche1"].ToString());
                 }
                 if (assiette_imposable <= float.Parse(table.Rows[0]["tranche1"].ToString()))
                 {
                     assiette_imposable -= assiette_imposable - float.Parse(table.Rows[0]["tranche1"].ToString());
                 }

                 impot.Add(new bulletin_paie() { designation = "IRPP", retenue = irpp, montant = assiette_imposable, taux = float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString()) });
                 net_social -= irpp;
              }


             if (Equals(table.Rows[0]["assurance_type"].ToString(), "salairebase"))
             {
                 impot.Add(new bulletin_paie() { designation = "Retenue assurance groupe", retenue = (float.Parse(table.Rows[0]["sal_base"].ToString())* float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString()))/100, montant = float.Parse(table.Rows[0]["sal_base"].ToString()), taux = float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString()) });
                 net_social -= (float.Parse(table.Rows[0]["sal_base"].ToString()) * float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString())) / 100;
             }
             else
             {
                 impot.Add(new bulletin_paie() { designation = "Retenue assurance groupe", retenue = (salaire_Brute * float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString())) / 100, montant = salaire_Brute, taux = float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString()) });
                 net_social -= (salaire_Brute * float.Parse(table.Rows[0]["assurance_tauxemploye"].ToString())) / 100;
             }
             //bech nzidha fel base verif ccs //a vérifier 
             impot.Add(new bulletin_paie() { designation = "Contribution sociale de solidarité 1%", retenue = ((assiette_imposable*1)/100)/12, montant = assiette_imposable/12, taux = 1 });
             net_social -= ((assiette_imposable * 1) / 100) / 12;
             if (float.Parse(table.Rows[0]["tfp"].ToString()) > 0)
             {
                 net_social -= (salaire_Brute* float.Parse(table.Rows[0]["tfp"].ToString()))/100;
             }
             if (float.Parse(table.Rows[0]["foprolos"].ToString()) > 0)
             {
                 net_social -= (salaire_Brute * float.Parse(table.Rows[0]["foprolos"].ToString())) / 100;
             }


             salaire_net = net_social;

             return Request.CreateResponse(HttpStatusCode.OK, table);

         }
        */
/*
        //salaire net a payer 
        [Route("paie/employe/impot/{matricule}/{exercice}/{mois}")]
        [HttpGet]
        public HttpResponseMessage Calcule_net_payer(string matricule, int exercice, int mois)
        {


            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Prime_select_paie";
            sqlCmd.Parameters.AddWithValue("@matricule", matricule);
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            List<bulletin_paie> net_payer = new List<bulletin_paie>();
            myConnection.Open();
            SqlDataReader prime = sqlCmd.ExecuteReader();
            while (prime.Read())
            {
                if (!(Convert.ToBoolean(prime["cotisable"])) && !(Convert.ToBoolean(prime["imposable"]))&& !(Convert.ToBoolean(prime["tfp"])) && !(Convert.ToBoolean(prime["foprolos"]))&&!(Convert.ToBoolean(prime["assurance_groupe"]))&& !(Convert.ToBoolean(prime["medecine_travail"])))
                {
                    if (Equals(prime["type"].ToString(), "variable"))
                    {
                        net_payer.Add(new bulletin_paie() { designation = prime["rubrique"].ToString(), gain = float.Parse(prime["sal_base"].ToString()) * float.Parse(prime["taux"].ToString()) });
                        salaire_net += float.Parse(prime["sal_base"].ToString()) * float.Parse(prime["taux"].ToString());
                    }
                    else
                    {
                        net_payer.Add(new bulletin_paie() { designation = prime["rubrique"].ToString(), gain = float.Parse(prime["montant_fixe"].ToString()) });
                        salaire_net += float.Parse(prime["montant_fixe"].ToString());
                    }
                }

            }
            sqlCmd.CommandText = "Avance_matricule";
            myConnection.Close();
            myConnection.Open();
            SqlDataReader avance = sqlCmd.ExecuteReader();
            while (avance.Read())
            {
                net_payer.Add(new bulletin_paie() { designation = "Avance", retenue = float.Parse(avance["montant"].ToString())});
                salaire_net -= float.Parse(avance["montant"].ToString());
            }
            sqlCmd.CommandText = "Pret_matricule";
            myConnection.Close();
            myConnection.Open();
            SqlDataReader prets = sqlCmd.ExecuteReader();
            while (prets.Read())
            {
                net_payer.Add(new bulletin_paie() { designation = "prêt", retenue = float.Parse(avance["montant_echeance"].ToString()) });
                salaire_net -= float.Parse(avance["montant_echeance"].ToString());
            }
            //nzidhom fel base table arrondi 
            net_payer.Add(new bulletin_paie() { designation = "Nouvel arrondi", retenue = salaire_net-(float)Math.Floor(salaire_net) });

            salaire_net = (float)Math.Floor(salaire_net);





            return Request.CreateResponse(HttpStatusCode.OK,net_payer);
        }*/

        [Route("paie/bordereaux/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Getbordereaux(int exercice)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Paie_select";
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("paie/rubriques/{id_bor}/{type}")]
        [HttpGet]
        public HttpResponseMessage Getbelemnts(int id_bor,string type)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Bulletin_paie_select";
            sqlCmd.Parameters.AddWithValue("@id_bor", id_bor);
            sqlCmd.Parameters.AddWithValue("@type", type);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        //sélection par departement/service/section/college
        [Route("paie/employe/{matricule}/{exercice}")]
        [HttpGet]
        public HttpResponseMessage Getinfoemploye(int matricule,int exercice)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Employe_select_matricule_paie";
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Parameters.AddWithValue("@matricule", matricule);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("paie/employe/departement/{departement}")]
        [HttpGet]
        public HttpResponseMessage Getinfoemployedepartement(string departement)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Employe_get_departement";
            sqlCmd.Parameters.AddWithValue("@departement", departement);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("paie/employe/section/{section}")]
        [HttpGet]
        public HttpResponseMessage Getinfoemployesection(string section)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Employe_get_section";
            sqlCmd.Parameters.AddWithValue("@section", section);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("paie/employe/service/{service}")]
        [HttpGet]
        public HttpResponseMessage Getinfoemployeservice(string service)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Employe_get_service";
            sqlCmd.Parameters.AddWithValue("@service", service);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("paie/employe/college/{college}")]
        [HttpGet]
        public HttpResponseMessage Getinfoemployecollege(string college)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Employe_get_college";
            sqlCmd.Parameters.AddWithValue("@college", college);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("paie/employe/matricule/{matricule}")]
        [HttpGet]
        public HttpResponseMessage Getinfomatriculke(string matricule)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Employe_get_matricule";
            sqlCmd.Parameters.AddWithValue("@matricule", matricule);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("paie/allemployes")]
        [HttpGet]
        public HttpResponseMessage Getallemploye()
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Employe_paie_all";
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [Route("paie/bordereaux_verif/{matricule}/{exercice}/{mois}")]
        [HttpGet]
        public HttpResponseMessage varificationbordereaux(string matricule,int exercice,int mois)
        {
            DataTable table = new DataTable();
            SqlConnection myConnection = new SqlConnection();
            myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = "Paie_matricule_mois_exercice";
            sqlCmd.Parameters.AddWithValue("@matricule", matricule);
            sqlCmd.Parameters.AddWithValue("@exercice", exercice);
            sqlCmd.Parameters.AddWithValue("@mois", mois);
            sqlCmd.Connection = myConnection;
            SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            da.Fill(table);
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }













        /*
                //cotisation 
                [Route("paie/employe/cotisation/{matricule}/{exercice}/{mois}")]
                [HttpGet]
                public HttpResponseMessage Calcule_cotisation(string matricule, int exercice, int mois)
                {
                    net_social = salaire_Brute;
                    DataTable table = new DataTable();
                    SqlConnection myConnection = new SqlConnection();
                    myConnection.ConnectionString = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.CommandText = "Paie_get_employe_societe";
                    sqlCmd.Connection = myConnection;
                    sqlCmd.Parameters.AddWithValue("@matricule", matricule);
                    sqlCmd.Parameters.AddWithValue("@exercice", exercice);
                    List<bulletin_paie> cotisation = new List<bulletin_paie>();

                    SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
                    da.Fill(table);
                    //vérification 3ala employé w ela cotisation patronale dupliqu liste 
                    if (float.Parse(table.Rows[0]["cnss_cot_employe"].ToString()) > 0)
                    {
                        cotisation.Add(new bulletin_paie() { designation = "Cotisation cnss", retenue = (salaire_Brute * float.Parse(table.Rows[0]["cnss_cot_employe"].ToString())) / 100, montant = salaire_Brute, taux = float.Parse(table.Rows[0]["cnss_cot_employe"].ToString()) });
                        net_social -= (salaire_Brute * float.Parse(table.Rows[0]["cnss_cot_employe"].ToString())) / 100;
                    }
                    if (float.Parse(table.Rows[0]["cnss_acc_travail"].ToString()) > 0)
                    {
                        cotisation.Add(new bulletin_paie() { designation = "Cotisation accident de travail", retenue = (salaire_Brute * float.Parse(table.Rows[0]["cnss_acc_travail"].ToString())) / 100, montant = salaire_Brute, taux = float.Parse(table.Rows[0]["cnss_acc_travail"].ToString()) });
                        net_social -= (salaire_Brute * float.Parse(table.Rows[0]["cnss_acc_travail"].ToString())) / 10;
                    }
                    if (float.Parse(table.Rows[0]["cnss_medecin_travail"].ToString()) > 0)
                    {
                        cotisation.Add(new bulletin_paie() { designation = "Cotisation medecin de travail", retenue = (salaire_Brute * float.Parse(table.Rows[0]["cnss_medecin_travail"].ToString())) / 100, montant = salaire_Brute, taux = float.Parse(table.Rows[0]["cnss_medecin_travail"].ToString()) });
                        net_social -= (salaire_Brute * float.Parse(table.Rows[0]["cnss_medecin_travail"].ToString())) / 100;
                    }
                    if (float.Parse(table.Rows[0]["cnss_regimec_employe"].ToString()) > 0)
                    {
                        cotisation.Add(new bulletin_paie() { designation = "Régime complémentaire", retenue = (salaire_Brute * float.Parse(table.Rows[0]["cnss_regimec_employe"].ToString())) / 100, montant = salaire_Brute, taux = float.Parse(table.Rows[0]["cnss_regimec_employe"].ToString()) });
                        net_social -= (salaire_Brute * float.Parse(table.Rows[0]["cnss_regimec_employe"].ToString())) / 100;
                    }




                    return Request.CreateResponse(HttpStatusCode.OK, cotisation);

                }*/






    }
}
