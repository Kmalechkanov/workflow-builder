import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Authentication } from '../models/authentication/authentication.model';
import { Authschema } from '../models/authentication/authschema-model.model';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private httpClient: HttpClient,
    ) { }

    get(id: number): Observable<Authentication> {
        return this.httpClient.get<Authentication>(env.api + '/400/authentications/' + id);
    }

    getAll(userId: number): Observable<Authentication[]> {
        let httpParams = new HttpParams()
            .set('userid', userId);
        return this.httpClient.get<Authentication[]>(env.api + '/440/authentications', { params: httpParams });
    }

    getSchemes(): Observable<Authschema[]> {
        return this.httpClient.get<Authschema[]>(env.api + '/440/authschemas');
    } 
}