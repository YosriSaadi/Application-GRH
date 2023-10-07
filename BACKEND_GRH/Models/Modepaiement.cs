using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Modepaiement
    {
        public string id { get; set; }
        public string mode { get; set; }
        public string ccb { get; set; }
        public string ccp { get; set; }
        public string Ncompte { get; set; }
        public string Nrib { get; set; }
        public string Banque { get; set; }
        public string agence { get; set; }
        public string shift { get; set; }
        public string matricule { get; set; }
    }
}