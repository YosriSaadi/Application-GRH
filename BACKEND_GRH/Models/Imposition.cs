using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Imposition
    {
        public string matCNSS { get; set; }
        public string dateaff { get; set; }
        public string cotisationE { get; set; }
        public string cotisationP { get; set; }
        public string accidenttra { get; set; }
        public string medecinetra { get; set; }
        public string regimeIirpp { get; set; }
        public string baremeirpp { get; set; }
        public string nbreMens { get; set; }
        public string assurancevie { get; set; }
        public string interetann { get; set; }
        public Boolean tfp { get; set; }
        public Boolean foprolos { get; set; }
        public string matricule { get; set; }
    }
}