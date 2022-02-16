import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from '../shared/interfaces/form.interface';
import { PostsService } from '../shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public posts: IPost[] = []
  public pSub!: Subscription;
  public dSub!: Subscription;
  public search = ''


  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe((posts)=> {
      this.posts = posts
    })
  }

  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id)
    })
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }
    if(this.dSub) {
      this.dSub.unsubscribe()
    }
  }



}
