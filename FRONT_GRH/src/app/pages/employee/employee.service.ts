import { Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { Employee, SearchResult } from './employeee.model';

import { EmployeeData } from './data';

import { SortDirection } from './employee-sortable.directive';
import { HttpClient } from '@angular/common/http';

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
 * @param employees Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(employees: Employee[], column: string, direction: string): Employee[] {
    if (direction === '') {
        return employees;
    } else {
        return [...employees].sort((a, b) => {
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
function matches(employees: Employee, term: string, pipe: PipeTransform) {
    return employees.matricule.toLowerCase().includes(term)
        || employees.nom.toLowerCase().includes(term)
        || employees.prenom.toLowerCase().includes(term);
}

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    public lol:Employee[]=EmployeeData;

    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _employees$ = new BehaviorSubject<Employee[]>([]);
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

    constructor(private pipe: DecimalPipe,private http:HttpClient) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._employees$.next(result.employees);
            this._total$.next(result.total);
        });

        this._search$.next();
    }

    /**
     * Returns the value
     */
    get tables$() { return this._employees$.asObservable(); }
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
        let employees = sort(this.lol, sortColumn, sortDirection);

        // 2. filter
        employees = employees.filter(table => matches(table, searchTerm, this.pipe));
        const total = employees.length;

        // 3. paginate
        this.totalRecords = employees.length;
        this._state.startIndex = (page - 1) * this.pageSize + 1;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        employees = employees.slice(this._state.startIndex - 1, this._state.endIndex);

        return of(
            { employees, total }
        );
    }
        deletePersonnel(id:any):Observable<any>{

            return this.http.delete<any>("http://localhost:49366/employee_delete/"+id);  
        }
        GetPersonnel(societe):Observable<any>{

            return this.http.get<any>("http://localhost:49366/employes/"+societe);  
        }
    /************etat************************ */
    addetat(Table,societe): Observable<any> {
        return this.http.post<any>("http://localhost:49366/employee_add/"+societe,Table);
    }

    Getetatbyid(code):Observable<any>{
    return this.http.get<any>("http://localhost:49366/employee_byid/"+code);
    }

        updateetat(regime){  
return this.http.put<any>("http://localhost:49366/employee_update",regime);
}
    /*****************************enfant********** */
    addEnfant(Enfant): Observable<any> {
        return this.http.post<any>("http://localhost:49366/enfant_add",Enfant);
    }
        GetEnfant(matricule):Observable<any>{
            return this.http.get<any>("http://localhost:49366/enfants/"+matricule);
        }
            deleteenfant(id):Observable<any>{
                return this.http.delete<any>("http://localhost:49366/enfant_delete/"+id);
                }
                updateenfant(e){  
        return this.http.put<any>("http://localhost:49366/enfant_update",e);
        }
/****************************************************************** */
            
            addQualification(Qualification): Observable<any> {
                return this.http.post<any>("http://localhost:49366/qualification_add",Qualification);
            }
            GetQualification(matricule):Observable<any>{
                return this.http.get<any>("http://localhost:49366/qualification/"+matricule);
                }
                deletequal(id):Observable<any>{
                    return this.http.delete<any>("http://localhost:49366/qualification_delete/"+id);
                    }
                    updatequali(e){  
            return this.http.put<any>("http://localhost:49366/qualification_update",e);
            }
                /************************************************************* */
                addDroitConge(DroitConge,exercice): Observable<any> {
                    return this.http.post<any>("http://localhost:49366/droit_add/"+exercice,DroitConge);
                }
                GetDroitConge():Observable<any>{
                    return this.http.get<any>("http://localhost:49366/droits");
                    }
                    deletedroit(id):Observable<any>{
                        return this.http.delete<any>("http://localhost:49366/droit_delete/"+id);
                        }
                        updatedroit(e){  
                return this.http.put<any>("http://localhost:49366/droit_update",e);
                }
                    /********************salaire************************************ */
                    addsalaire(Table): Observable<any> {
                        return this.http.post<any>("http://localhost:49366/salaire_add",Table);
                    }
                
                    Getsalairebyid(id:any):Observable<any>{
                        return this.http.get<any>("http://localhost:49366/salaire_byid/"+id);
                        }
                        updatesalaire(regime){  
                return this.http.put<any>("http://localhost:49366/salaire_update",regime);
                }
            /*********************************imposition****************** */
            addimposition(Table): Observable<any> {
                return this.http.post<any>("http://localhost:49366/imposition_add",Table);
            }
        
            Getimpositionnyid(matricule:any):Observable<any>{
                return this.http.get<any>("http://localhost:49366/imposition_by_matricule/"+matricule);
            }
                Getimpositionmatricule(id:any):Observable<any>{
                    return this.http.get<any>("http://localhost:49366/imposition_byid/"+id);
                    }
                updateimposition(regime){  
        return this.http.put<any>("http://localhost:49366/imposition_update",regime);}
                        /*********************************divers****************** */
                        adddivers(Table): Observable<any> {
                            return this.http.post<any>("http://localhost:49366/divers_add",Table);
                        }
                    
                        Getdiversbyid(id:any):Observable<any>{
                            return this.http.get<any>("http://localhost:49366/divers_byid/"+id);
                            }
                    Getdivers_matricule(matricule:any):Observable<any>{
                                return this.http.get<any>("http://localhost:49366/diversby_matricule/"+matricule);
                        }
                            updatedivers(regime){  
                    return this.http.put<any>("http://localhost:49366/divers_update",regime);}

}
