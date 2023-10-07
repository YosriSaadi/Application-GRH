import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Table, SearchResult } from '../shared/prime.model';
import { tableData } from '../shared/data';
import { SortDirection } from '../shared/prime-sortable.directive';
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
    return  tables.matricule_employe.toLowerCase().includes(term)
        || tables.nom.toLowerCase().includes(term)
        || tables.rubrique.toLowerCase().includes(term)
        || pipe.transform(tables.mois).includes(term)
        || pipe.transform(tables.montant).includes(term);
}

@Injectable({
    providedIn: 'root'
})

export class PrimeService {
    public p:Table[]=tableData;
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

    constructor(private http:HttpClient,private pipe: DecimalPipe) {
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
        let tables = sort(this.p, sortColumn, sortDirection);

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

    addprime(prime,exercice){
        return this.http.post("http://localhost:49366/prime/add/"+exercice,prime);
    }
    
    Getprimes(exercice):Observable<any>{
        return this.http.get<any>("http://localhost:49366/primes/"+exercice);
    }
    Gettypesprimes():Observable<any>{
        return this.http.get<any>("http://localhost:49366/prime_type");
    }
    /*Getemployes():Observable<any>{
        return this.http.get<any>("http://localhost:49366/employeess");
    }*/
    updateprime(prime,id){
        return this.http.put<any>("http://localhost:49366/prime/update/"+id,prime);
    }
    deleteprime(id:any):Observable<any>{
        return this.http.delete<any>("http://localhost:49366/prime/delete/"+id);  
    }
    Getmois():Observable<any>{
        return this.http.get<any>("http://localhost:49366/mois");
        }
    Get_employe_matricule(matricule):Observable<any>{
            return this.http.get<any>("http://localhost:49366/employee/matricule/"+matricule);
    }
    employes(societe):Observable<any>{

        return this.http.get<any>("http://localhost:49366/employes/"+societe);  
    }
       //vérification cloture
     mois_cloture(mois,societe):Observable<any>{
        return this.http.get<any>("http://localhost:49366/mois/cloture/"+mois+"/"+societe);
    }
    
}
