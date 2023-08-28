import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  constructor(private http: HttpClient) {}

  getCharacters(params: any): Observable<any>{
    return this.http.get( environment.baseUrl + environment.character, { params } )

  }
  
  getCharactersById(id: string): Observable<any>{
    return this.http.get( environment.baseUrl + environment.character + id )

  }

  getByUrl(url: string):Observable<any>{
    return this.http.get(url)
  }


}
