using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BACKEND_GRH.Models
{
	public class Shift
	{

		public string code { get; set; }
		public string shift { get; set; }
		public string regime { get; set; }
		public int pardefault { get; set; }
		public int nbrjm { get; set; }
		public Boolean defaut { get; set; }
		public int nbrhm { get; set; }
		public string horaire { get; set; }
		public int nbrpm { get; set; }



	}
}