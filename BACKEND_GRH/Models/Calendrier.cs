using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Calendrier
    {
        public int id { get; set; }
        public string title { get; set; }
        public string start { get; set; }

        public string className { get; set; }

        public int id_shift { get; set; }

        public int societe_id { get; set; }


    }
}