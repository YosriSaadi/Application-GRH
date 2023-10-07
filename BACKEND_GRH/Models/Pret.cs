using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Pret
    {
        public int id { get; set; }
        public int pret_id { get; set; }
        public float montant_pret { get; set; }

        public float montant_echeance { get; set; }
        public DateTime date_echeance { get; set; }
        public DateTime date { get; set; }

        public string libelle { get; set; }
        public string type { get; set; }
        public string solde { get; set; }
        public string observation { get; set; }
        public float montant_solde { get; set; }

        public float reste { get; set; }
        public int matricule_employe { get; set; }
    }
}