// Table data
export interface avance {
    id:number
    matricule_employe: number;
    nom: string;
    date: string;
    mois_imputation: number;
    montant: number;
    salaire_base: number;
    etat_solde:string;
    type:string;
    observation:string;
}

// Search Data
export interface SearchResult {
    avances: avance[];
    total: number;
}
