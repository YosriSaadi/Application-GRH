// Table data
export interface Table {
    matricule_employe: string;
    nom: string;
    rubrique: string;
    montant: number;
    mois: number;
    montant_fixe:Float32Array;
    plafond:Float32Array;
    taux:Float32Array;
    montant_min:Float32Array;
    montant_max:Float32Array;
}
export interface mois_prime {
   id:number,
   mois:string,
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
