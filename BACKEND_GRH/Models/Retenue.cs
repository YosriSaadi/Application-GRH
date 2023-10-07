using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using BACKEND_GRH.Models;
namespace BACKEND_GRH.Models
{
    public class Retenue
    {
        public int id { get; set; }
        public float montant { get; set; }
        public int mois { get; set; }
        public string designation { get; set; }

        public string matricule_employe { get; set; }

    }
}