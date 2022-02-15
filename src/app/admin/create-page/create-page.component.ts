import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPost } from '../shared/form.interface';
import { PostsService } from '../shared/services/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  public form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      author: ['', Validators.required],
    })
  }

  public submit() {
    if(this.form.invalid) {
      return
    }
    const post: IPost = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date,
    }

    this.postService.create(post).subscribe(() => {
      this.form.reset()
    })
  }

}
