using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Mois
    {
        public int ordre { get; set; }
        public string designation { get; set; }
        public Boolean cloture { get; set; }
        public string base_calcul { get; set; }
        public Boolean taux_assiduite { get; set; }
        public Boolean assurance_groupe { get; set; }
        public Boolean liq_impot { get; set; }
    }
}