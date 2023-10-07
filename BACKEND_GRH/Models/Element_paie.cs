using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Element_paie
    {

        public int societe_id { get; set; }
        public float cnss_cot_patronal { get; set; }

        public float cnss_cot_employe { get; set; }
        public float cnss_acc_travail { get; set; }
        public float cnss_medecin_travail { get; set; }
        public float cnss_regimec_employe { get; set; }

        public float cnss_regimec_patron { get; set; }
        public float irpp { get; set; }
        public float tfp { get; set; }
        public float foprolos { get; set; }

        public string assurance_type { get; set; }

        public Int64 assurance_numcontrat { get; set; }
        public float assurance_tauxemploye { get; set; }
        public float assurance_tauxemployeur { get; set; }
        public string assurance_imposition { get; set; }
        public string assurance_compagnie { get; set; }
        public string assurance_datedebut { get; set; }
        public string assurance_datefin { get; set; }
        public string gestion_presence { get; set; }
        
        public string paie_calendrier { get; set; }
        public string liquidation_impot { get; set; }

        public string reg_commerce { get; set; }

        public string c_colective { get; set; }
        public float taux_hs { get; set; }
        public float taux_hs1 { get; set; }
        public float taux_hs2 { get; set; }
        public string arrond_irpp { get; set; }
        public int mois_prime_rend { get; set; }
        public string periode_prime_rend { get; set; }

        public string prime_rend { get; set; }

        

    }
}