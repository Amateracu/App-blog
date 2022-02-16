import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ICreateResponse, IPost } from "../interfaces/form.interface";

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

  getById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map((post: IPost) => {
        return {
          ...post,
          id
        }
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }
}
