using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Societe
    {
        public int id { get; set; }
        public string nom { get; set; }
       
        public string adresse { get; set; }
        public string ville { get; set; }
        public string rue{ get; set; }
        public int code_postal { get; set; }
        public int tel { get; set; }
        public string email { get; set; }
        public int  fax { get; set; }
        public string matricule_cnss { get; set; }
        public string date_ouverture { get; set; }
        public string Activite { get; set; }

        public string matricule_fiscal { get; set; }



    }
}