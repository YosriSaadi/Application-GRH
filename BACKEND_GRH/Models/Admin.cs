using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Admin
    {
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string nom { get; set; }
        public string prenom { get; set; }
    }

}