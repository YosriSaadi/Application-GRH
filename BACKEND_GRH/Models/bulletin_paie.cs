using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class bulletin_paie
    {
        public string designation { get; set; }
        public string type { get; set; }
        public float  nombre { get; set; }

        public float montant { get; set; }

        public float gain { get; set; }

        public float retenue { get; set; }

        public float taux  { get; set; }
    }
}