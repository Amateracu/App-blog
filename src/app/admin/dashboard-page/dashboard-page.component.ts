import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from '../shared/form.interface';
import { PostsService } from '../shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public posts!: IPost[];
  public pSub!: Subscription;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe((posts)=> {
      this.posts = posts
    })
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }
  }


}
