// Table data
export interface Table {
    id:number
    matricule_employe: number;
    nom: string;
    motif: string;
    abattable: boolean;
    date_debut: string;
    date_fin: string;
    mois: string;
    nbr_jours: number;
   
}
// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}

