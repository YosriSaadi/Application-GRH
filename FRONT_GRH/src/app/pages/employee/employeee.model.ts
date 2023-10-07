// Table data
export interface Employee {
    matricule:string;
	nom:string;
	prenom:string;
	datenaiss:Date;
	lieu:string;
	nationnalite:string;
	NCin:string;
	lieuC:string;
	dateC:Date;
	adresse:string;
	Ntel:string;
	dateEmb:Date;
	sexe:string;
	college:string;
	dateEmbGrp:Date;
	creditB:number;
	creditS:number;
}
export interface Enfant
{
	Id:string;
	nom:string;
	date:Date;
	encharge:string;
	infirme:string;
	etudiant:string;
	bourse:string;

}
// Search Data
export interface SearchResult {
    employees: Employee[];
	// enfants:Enfant[];
    total: number;
}
