using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Regime
    {
        public string code { get; set; }
        public string designation { get; set; }
        public int nbrhs { get; set; }
        public int nbrhm { get; set; }
        public int nbrhmm { get; set; }
    }
}
