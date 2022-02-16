import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { IPost } from '../shared/interfaces/form.interface';
import { PostsService } from '../shared/services/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public post!: IPost;
  public submitted = false;
  public updateSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params.id)
      })
      ).subscribe((post: IPost) => {
        this.post = post
        this.form = this.formBuilder.group({
          title:[post.title, Validators.required],
          text:[post.text, Validators.required],
        })
      })
    }

    ngOnDestroy(): void {
      if (this.updateSub) {
        this.updateSub.unsubscribe;
      }
    }

    submit() {
      if (this.form.invalid) return;
      this.submitted = true
      this.updateSub = this.postsService.update({
        ...this.post,
      ...this.form.value,
    }).subscribe(() => {
      this.submitted = false;
    })
  }

}
