using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Conges
    {
        public string id { get; set; }
        public Boolean paye { get; set; }

        public Nullable<int> mois { get; set; }

        public string typec { get; set; }
        public Nullable<System.DateTime> dated { get; set; }
        public Nullable<System.DateTime> datef { get; set; }
        public Nullable<System.DateTime> daterep { get; set; }
        public string nom { get; set; }
        public int nbr_jrs { get; set; }
        public string matricule { get; set; }
    }
}