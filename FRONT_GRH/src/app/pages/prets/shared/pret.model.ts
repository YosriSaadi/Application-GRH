export interface pret {
    id:number
    pret_id:number;
    matricule_employe:any
    montant_pret:any;
    montant_echeance:any;
    date_echeance: any;
    date:any;
    mois: any;
    anne: any;
    solde:string;
    observation:string;
   
}
// Table data
export interface Order {
    matricule_employe: number;
    nom: string;
    date: any;
    id:number;
    libelle:string;
    montant_pret: number;
    montant_solde: number;
    reste:number;
}

// Search Data
export interface SearchResult {
    orders: Order[];
    total: number;
}

