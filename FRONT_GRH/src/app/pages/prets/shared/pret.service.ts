import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Order, SearchResult } from './pret.model';

import { ordersData } from './data';

import { SortDirection } from './pret-sortable.directive';

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
}

function compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

/**
 * Sort the table data
 * @param orders Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(orders: Order[], column: string, direction: string): Order[] {
    if (direction === '') {
        return orders;
    } else {
        return [...orders].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

/**
 * Table Data Match with Search input
 * @param tables Table field value fetch
 * @param term Search the value
 */
function matches(orders: Order, term: string, pipe: PipeTransform) {
    return pipe.transform(orders.matricule_employe).includes(term)
        || pipe.transform(orders.id).includes(term)
        || pipe.transform(orders.montant_pret).includes(term)
        || pipe.transform(orders.reste).includes(term)
        || pipe.transform(orders.montant_solde).includes(term)
        || orders.nom.toLowerCase().includes(term)
        || orders.libelle.toLowerCase().includes(term)
        || orders.date.toLowerCase().includes(term)
}

@Injectable({
    providedIn: 'root'
  })


  export class pretservice{
    public p:Order[]=ordersData;
      // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _orders$ = new BehaviorSubject<Order[]>([]);
    // tslint:disable-next-line: variable-name
    private _total$ = new BehaviorSubject<number>(0);

    // tslint:disable-next-line: variable-name
    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        startIndex: 1,
        endIndex: 10,
        totalRecords: 0
    };

    constructor(private http:HttpClient,private pipe: DecimalPipe) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._orders$.next(result.orders);
            this._total$.next(result.total);
        });

        this._search$.next();
    }
    
    /**
     * Returns the value
     */
     get tables$() { return this._orders$.asObservable(); }
     get total$() { return this._total$.asObservable(); }
     get loading$() { return this._loading$.asObservable(); }
     get page() { return this._state.page; }
     get pageSize() { return this._state.pageSize; }
     get searchTerm() { return this._state.searchTerm; }
     get startIndex() { return this._state.startIndex; }
     get endIndex() { return this._state.endIndex; }
     get totalRecords() { return this._state.totalRecords; }
 
     /**
      * set the value
      */
     // tslint:disable-next-line: adjacent-overload-signatures
     set page(page: number) { this._set({ page }); }
     // tslint:disable-next-line: adjacent-overload-signatures
     set pageSize(pageSize: number) { this._set({ pageSize }); }
     // tslint:disable-next-line: adjacent-overload-signatures
     // tslint:disable-next-line: adjacent-overload-signatures
     set startIndex(startIndex: number) { this._set({ startIndex }); }
     // tslint:disable-next-line: adjacent-overload-signatures
     set endIndex(endIndex: number) { this._set({ endIndex }); }
     // tslint:disable-next-line: adjacent-overload-signatures
     set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
     // tslint:disable-next-line: adjacent-overload-signatures
     set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
     set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
     set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }
 
     private _set(patch: Partial<State>) {
         Object.assign(this._state, patch);
         this._search$.next();
     }
 
     /**
      * Search Method
      */
     private _search(): Observable<SearchResult> {
         const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
 
         // 1. sort
         let orders = sort(this.p, sortColumn, sortDirection);
 
         // 2. filter
         orders = orders.filter(table => matches(table, searchTerm, this.pipe));
         const total = orders.length;
 
         // 3. paginate
         this.totalRecords = orders.length;
         this._state.startIndex = (page - 1) * this.pageSize + 1;
         this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
         if (this.endIndex > this.totalRecords) {
             this.endIndex = this.totalRecords;
         }
         orders = orders.slice(this._state.startIndex - 1, this._state.endIndex);
 
         return of(
             { orders, total }
         );
     }











  //api
    Getprets(etat_pret,type_pret,exercice):Observable<any>{
    return this.http.get<any>("http://localhost:49366/prets/"+etat_pret+"/"+type_pret+"/"+exercice);
    }

    Get_employe_matricule(matricule):Observable<any>{
        return this.http.get<any>("http://localhost:49366/employee/matricule/"+matricule);
        }
        
    Get_echeance_id(id):Observable<any>{
        return this.http.get<any>("http://localhost:49366/pret/echeances/"+id);
        }
    updatepret(pret,id){
        return this.http.put<any>("http://localhost:49366/hs/update/"+id,pret);
    }

    addpret(pret,exercice){
        return this.http.post("http://localhost:49366/prets/add/"+exercice,pret);
    }
    addecheance(echeance:any){
        return this.http.post("http://localhost:49366/prets/echeance/add",echeance);
    }
    deletepret(id:any):Observable<any>{
        return this.http.delete<any>("http://localhost:49366/pret/delete/"+id);  
    }
    Get_libelle_pret(societe):Observable<any>{
        return this.http.get<any>("http://localhost:49366/libelle_prets/"+societe);
    }
    update_pret_echeance_etatsolde(pret){
        return this.http.put<any>("http://localhost:49366/prets/echeance/etatsolde",pret);
    }
    update_echeance(echeance){
        return this.http.put<any>("http://localhost:49366/echeance/update",echeance);
    }

    Get_societe(id)
   {
    return this.http.get<any>("http://localhost:49366/getsociete/id/"+id);
   }
   //employés
   employes(societe):Observable<any>{
    return this.http.get<any>("http://localhost:49366/employes/"+societe);  
   }
     //vérification cloture
    mois_cloture(mois,societe):Observable<any>{
        return this.http.get<any>("http://localhost:49366/mois/cloture/"+mois+"/"+societe);
    }

}