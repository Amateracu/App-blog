import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IPost } from '../admin/shared/interfaces/form.interface';
import { PostsService } from '../admin/shared/services/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  public post$!: Observable<IPost>

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params.id)
      }))
  }

}
