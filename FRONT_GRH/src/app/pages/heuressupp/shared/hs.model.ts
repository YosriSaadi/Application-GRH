// Table data
export interface Table {
    id:number;
    matricule_employe: number;
    nom: string;
    date: string;
    taux_horaire: number;
    hs1_25: number;
    hs1_5: number;
    hs1_4: number;
    hs1_75: number;
    hs2: number;
    hs_nuit: number;
   
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
