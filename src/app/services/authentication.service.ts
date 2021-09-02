import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable, Subject } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { Authentication } from '../models/authentication/authentication.model';
import { Authschema } from '../models/authentication/authschema-model.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private httpClient: HttpClient,
        private userService: UserService,
    ) { }

    private onChange = new Subject<any>();

    get$(id: number): Observable<Authentication> {
        return this.httpClient.get<Authentication>(env.api + '/400/authentications/' + id);
    }

    getAll$(userId: number): Observable<Authentication[]> {
        let httpParams = new HttpParams()
            .set('userId', userId);
        return this.httpClient.get<Authentication[]>(env.api + '/400/authentications', { params: httpParams });
    }

    getAllOf$(serviceName: string): Observable<Authentication[]> {
        let httpParams = new HttpParams()
            .set('userId', this.userService.getId())
            .set('serviceName', serviceName);
        return this.httpClient.get<Authentication[]>(env.api + '/400/authentications', { params: httpParams });
    }

    getSchemes$(): Observable<Authschema[]> {
        return this.httpClient.get<Authschema[]>(env.api + '/440/authschemas');
    }

    getServiceName$(id: number): Observable<string> {
        return this.httpClient.get<Authentication>(env.api + '/400/authentication/' + id).pipe(map(x => x.serviceName));
    }

    getSchema$(name: string): Observable<Authschema> {
        let httpParams = new HttpParams()
            .set('serviceName', name);
        return this.httpClient.get<Authschema[]>(env.api + '/440/authschemas', { params: httpParams }).pipe(map(x => x[0]));
    }

    edit$(id: number, name: string, description: string, data: object): Observable<Authentication> {
        let date = new Date().getTime();
        let body = {
            userId: this.userService.getId(),
            name,
            description,
            data: data,
            lastUpdated: date,
        }

        return this.httpClient.patch<Authentication>(env.api + '/600/authentications/' + id, body).pipe(tap(res => {
            this.onChange.next(res);
        }));
    }

    create$(name: string, description: string, serviceName: string, data: object): Observable<Authentication> {
        let date = new Date().getTime();
        let body = {
            userId: this.userService.getId(),
            name,
            description,
            serviceName,
            data: data,
            created: date,
            lastUpdated: date,
        }

        return this.httpClient.post<Authentication>(env.api + '/660/authentications', body).pipe(tap(res => {
            this.onChange.next(res);
        }));
    }

    delete$(id: number): Observable<any> {
        return this.httpClient.delete<Authentication>(env.api + '/600/authentications/' + id).pipe(tap(res => {
            this.onChange.next(res);
        }));
    }

    update$(obs: Observable<any>): Observable<any> {
        let initial = obs.pipe(take(1));
        let onChange = this.onChange.pipe(mergeMap(() => {
            return obs.pipe(take(1));
        }))
        return concat(initial, onChange);
    }
}