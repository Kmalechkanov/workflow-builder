import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flow } from '../models/flow.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FlowService {
    constructor(
        private httpClient: HttpClient,
    ) { }

    getAll(): Observable<Flow[]> {
        return this.httpClient.get<Flow[]>(env.api + '/flows');
        // TODO UPDATE THIS AFTER PULL REQUEST APROVAL
        // return this.httpClient.get<Flow[]>(env.api + '/640/flows');
    }
}