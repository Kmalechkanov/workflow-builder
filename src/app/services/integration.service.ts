import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Integration } from '../models/integration.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class IntegrationService {
    constructor(
        private httpClient: HttpClient,
    ) { }

    getAll(): Observable<Integration[]> {
        return this.httpClient.get<Integration[]>(env.api + '/640/integrations');
    }
}