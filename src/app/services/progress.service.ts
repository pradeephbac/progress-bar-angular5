import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ProgressService {
  PROGRESS_DOMAIN = environment.PROGRESS_DOMAIN;
  constructor(private http: Http) { }

  getProgressData() {
    return this.http.get(this.PROGRESS_DOMAIN + '/bars').map(res => res.json());
  }

}
