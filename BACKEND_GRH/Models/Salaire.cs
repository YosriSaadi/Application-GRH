using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Salaire
    {
        public string id { get; set; }

        public string mode;
        public string compte;

        public string Ncompte;
        public string Nrib;
        public string Banque;
        public string agence;


        public string taux;
        public float dureeEch { get; set; }
        public float anciennete_eff { get; set; }
        public float sal_base { get; set; }
        public float supp { get; set; }
        public float thorairehs { get; set; }
        public string shift { get; set; }
        public string matricule { get; set; }
    }
}