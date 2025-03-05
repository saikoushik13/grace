import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Blog {
  id: string;
  title: string;
  image: string;
  type: string;
  descriptiton: string;
  publishedDate: string;
  blogInfo: {
    carouselImage: string[];
    postBy: string;
    desc: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private JSON_URL = 'assets/blogs.json';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<{ blogs: Blog[] }>(this.JSON_URL).pipe(
      map(response => response.blogs)
    );
  }

  getBlogById(id: string): Observable<Blog | undefined> {
    return this.getBlogs().pipe(
      map(blogs => blogs.find(b => b.id === id))
    );
  }
}
