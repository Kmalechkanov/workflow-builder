import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Flow } from '../models/flow.model';

@Injectable({
    providedIn: 'root',
})
export class FlowService {
    constructor(
        private httpClient: HttpClient,
    ) { }

    get(id: number): Observable<Flow> {
        return this.httpClient.get<Flow>(env.api + '/440/flows/' + id);
    }
}