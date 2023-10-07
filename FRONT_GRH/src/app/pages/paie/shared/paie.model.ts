export interface Table {
    id:number;
    matricule:string;
    nom: string;
    salaire_base: any;
    salaire_brut: any;
    montant_retenue_cnss:any;
    net_payer: any;
    mois: string;
    departement:string;
    service:string;
    section:string;
    cot_pat:any;
    n_mois:number;

}
export interface paie {
    id:number;
    designation:string;
    type: string;
    nombre: any;
    taux: any;
    base: any;
    gain: string;
    retenue: string;
    id_bordereaux:string;

}
export interface employe {
    matricule:string,
    nom:string;
    adresse:string;
    departement:string,
    section:string,
    service:string,
    college:string,
    dateEmb:string,
    cin: string;
    matCNSS: any;
    etat: string;
    sal_base: any;
    congepris: any;
    congeactuel: any;
    solde_conge: any;
    mode:string;
    Nrib:string;
    Banque:string;
    emploi:any;
    droitM:any;

}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
