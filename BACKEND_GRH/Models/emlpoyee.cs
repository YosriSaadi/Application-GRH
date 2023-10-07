using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
    public class Employee
    {
        public string matricule { get; set; }
		public string nom { get; set; }
        public string prenom { get; set; }
        public string datenaiss { get; set; }
        public string lieu { get; set; }
        public string nationnalite { get; set; }
		public string NCin { get; set; }
		public string lieuC { get; set; }
		public string dateC { get; set; }
		public string adresse { get; set; }
		public string Ntel { get; set; }
		public string dateEmb { get; set; }
		public string sexe { get; set; }
		public string college { get; set; }
		public string dateEmbGrp { get; set; }
		public Boolean creditB { get; set; }
		public Boolean creditS { get; set; }
       public string departement { get; set; }
        public string etat { get; set; }
        public Boolean cheffamille { get; set; }

        public string service { get; set; }
        public string section { get; set; }
        public string dateaff { get; set; }

        /*	public string etat { get; set; }
    public int nbrenfant { get; set; }
    public int chefdefam { get; set; }
    public string statuprof { get; set; }*/

    }
}