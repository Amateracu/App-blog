import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ICreateResponse, IPost } from "../form.interface";

@Injectable({providedIn: 'root'})

export class PostsService {

  constructor(private http: HttpClient) {}

  create(post: IPost): Observable<IPost> {
    return this.http.post<ICreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: ICreateResponse) => {
        return {
          ...post,
          id: response.name,
        }
      }))
  }

  getAll(): Observable<IPost[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response: { [key: string]: any; }) => {
        return Object
          .keys(response)
          .map((key) => ({
            ...response[key],
            id: key,
          }));
      }));
  }
}
