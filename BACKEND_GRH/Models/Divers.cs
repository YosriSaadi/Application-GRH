using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Divers
    {
        public string id { get; set; }
        public string droitPR { get; set; }
        public string assurancegrp { get; set; }
        public string Nadhesion { get; set; }
        public string autorisehs { get; set; }
        public string autoriseMjhs { get; set; }
        public Nullable<float> basesoldeconge { get; set; }
        public Nullable<int> nbrhj { get; set; }
        public string matricule { get; set; }
    }
}