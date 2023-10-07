using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Prime
    {
        
        public int matricule { get; set; }
        public Boolean imposable { get; set; }
        public Boolean cotisable { get; set; }
        public Boolean tfp { get; set; }
        public Boolean foprolos { get; set; }
        public Boolean assurance_groupe { get; set; }
        public Boolean medecine_travail { get; set; }
        public string rubrique { get; set; }
        public string type { get; set; }
        public int mois { get; set; }
        public float montant_calcule { get; set; }
        public float montant_min { get; set; }
        public float montant_max { get; set; }

        public float montant_fixe{ get; set; }

        public float plafond { get; set; }

        public float taux { get; set; }
      

    }
}