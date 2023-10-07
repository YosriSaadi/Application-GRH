using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Absence
    {
       
         public int id { get; set; }
        public string motif { get; set; }
        public Boolean abattable { get; set; }

        public string date_debut { get; set; }
        public string date_fin { get; set; }

        public string matricule_employe { get; set; }

    }
}