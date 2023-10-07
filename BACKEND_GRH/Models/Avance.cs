using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Avance
    {
        public float montant { get; set; }
        public string date { get; set; }
        public string etat_solde { get; set; }
        public string type { get; set; }
        public string observation { get; set; }
        public int mois_imputation { get; set; }

        public int matricule_employe { get; set; }
        
      
    }
}