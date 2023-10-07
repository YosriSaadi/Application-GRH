import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { Table, SearchResult } from './paie.model';

import { tableData } from './data';

import { SortDirection } from './paie-sortable.directive';

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
* @param tabless Table field value
* @param column Fetch the column
* @param direction Sort direction Ascending or Descending
*/
function sort(tables: Table[], column: string, direction: string): Table[] {
  if (direction === '') {
      return tables;
  } else {
      return [...tables].sort((a, b) => {
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
function matches(tables: Table, term: string, pipe: PipeTransform) {
  return pipe.transform(tables.salaire_base).includes(term)
      || tables.nom.toLowerCase().includes(term)
      || tables.departement.toLowerCase().includes(term)
      || tables.section.toLowerCase().includes(term)
      || tables.service.toLowerCase().includes(term)
      || tables.mois.toLowerCase().includes(term)
      || pipe.transform(tables.salaire_brut).includes(term)
     

}

@Injectable({
  providedIn: 'root'
})

  export class paieservice{
    public a:Table[]=tableData;

    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _tables$ = new BehaviorSubject<Table[]>([]);
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

    constructor(private http:HttpClient,private auth:AuthfakeauthenticationService,private pipe: DecimalPipe) { 

      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
    ).subscribe(result => {
        this._tables$.next(result.tables);
        this._total$.next(result.total);
    });

    this._search$.next();
    }

  /**
     * Returns the value
     */
    get tables$() { return this._tables$.asObservable(); }
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
    let tables = sort(this.a, sortColumn, sortDirection);

    // 2. filter
    tables = tables.filter(table => matches(table, searchTerm, this.pipe));
    const total = tables.length;

    // 3. paginate
    this.totalRecords = tables.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
        this.endIndex = this.totalRecords;
    }
    tables = tables.slice(this._state.startIndex - 1, this._state.endIndex);

    return of(
        { tables, total }
    );
}
    Get_societe(id)
    {
     return this.http.get<any>("http://localhost:49366/getsociete/id/"+id);
    }
    //Bordereaux paie
    Get_Boredeaux(exercice)
    {
     return this.http.get<any>("http://localhost:49366/paie/bordereaux/"+exercice);
    }


    Get_paie(id,type)
    {
     return this.http.get<any>("http://localhost:49366/paie/rubriques/"+id+"/"+type);
    }
    Get_infoemploye(matricule,exercice)
    {
     return this.http.get<any>("http://localhost:49366/paie/employe/"+matricule+"/"+exercice);
    }
    
    Getmois():Observable<any>{
      return this.http.get<any>("http://localhost:49366/mois");
    }

    Getdepartements():Observable<any>{
      return this.http.get<any>("http://localhost:49366/departements");
    }

    Getservices():Observable<any>{
      return this.http.get<any>("http://localhost:49366/services");
    }

    Getsection():Observable<any>{
      return this.http.get<any>("http://localhost:49366/sections");
    }

    Getcollege():Observable<any>{
      return this.http.get<any>("http://localhost:49366/type_college");
    }

    Getemployebymatricule(matricule):Observable<any>{
      return this.http.get<any>("http://localhost:49366/paie/employe/matricule/"+matricule);
    }
    Getemployedepartements(departement):Observable<any>{
      return this.http.get<any>("http://localhost:49366/paie/employe/departement/"+departement);
    }
    Getemployeservices(services):Observable<any>{
      return this.http.get<any>("http://localhost:49366/paie/employe/service/"+services);
    }
    Getemployesection(section):Observable<any>{
      return this.http.get<any>("http://localhost:49366/paie/employe/section/"+section);
    }
    Getallemeployes():Observable<any>{
      return this.http.get<any>("http://localhost:49366/paie/allemployes");
    }
    generepaie(matricule,exercice,mois):Observable<any>{
      return this.http.get<any>("http://localhost:49366/paie/employe/"+matricule+"/"+exercice+"/"+mois);
    }
    //check cloture mois
    mois_cloture(mois,societe):Observable<any>{
      return this.http.get<any>("http://localhost:49366/mois/cloture/"+mois+"/"+societe);
    }
    //suppression
    deletebulletin(id:any):Observable<any>{
      return this.http.delete<any>("http://localhost:49366/paie/delete/"+id);  
    }
     //cexercice
    exercice(exercice):Observable<any>{
      return this.http.get<any>("http://localhost:49366/exercices_info/"+exercice);
     }
     //vérification
     vérification_bordereaux(matricule,exercice,mois):Observable<any>{
      return this.http.get<any>("http://localhost:49366/paie/bordereaux_verif/"+matricule+"/"+exercice+"/"+mois);
     }
    nombre_enfants(matricule):Observable<any>{
    return this.http.get<any>("http://localhost:49366/enfants/nombre/"+matricule);
    }
    //conges  nombre de jours pris par mois
    conges_pris_mois(matricule,mois,exercice):Observable<any>{
      return this.http.get<any>("http://localhost:49366/conges/nb_jours_mois/"+matricule+"/"+mois+"/"+exercice);
    }
    //absences nombre de jours
    absences_nombre_jours(matricule,mois,exercice):Observable<any>{
      return this.http.get<any>("http://localhost:49366/absences_nombre_jours/"+matricule+"/"+mois+"/"+exercice);
    }


  }