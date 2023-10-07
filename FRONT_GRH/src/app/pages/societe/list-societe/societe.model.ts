export interface societe {
    id:any;
    nom: string;
    email:string;
    adresse: string;
    rue: string;
    ville: string;
    tel:any;
    code_postal: any;
    matricule_cnss:string;
    date_ouverture:string;
    Activite:string;
    fax:any;
    matricule_fiscal:string;
}

// Search Data
export interface SearchResult {
    orders: societe[];
    total: number;
}
