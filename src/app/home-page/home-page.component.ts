import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../admin/shared/interfaces/form.interface';
import { PostsService } from '../admin/shared/services/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public posts$!: Observable<IPost[]>

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getAll()
  }

}
