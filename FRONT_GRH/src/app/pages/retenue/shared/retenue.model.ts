// Table data
export interface Table {
    id: number;
    montant: number;
    nom:string;
    mois: number;
    designation: string;
    matricule_employe: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
