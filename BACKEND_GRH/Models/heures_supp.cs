using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class heures_supp
    {
        public int id { get; set; }
        public string date { get; set; }
        public float hs1_25 { get; set; }

        public float hs1_5 { get; set; }
        public float hs1_75 { get; set; }

        public float hs1_4 { get; set; }

        public float hs2 { get; set; }

        public float hs_nuit { get; set; }
        public float tauxhs { get; set; }

        public int matricule { get; set; }

    }
}