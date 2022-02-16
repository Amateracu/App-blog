import { Pipe, PipeTransform } from "@angular/core";
import { IPost } from "../interfaces/form.interface";


@Pipe({
  name: "searchPost"
})

export class SearchPipe implements PipeTransform{

  transform(posts: IPost[], search = ''):IPost[] {
    if(!search.trim()) {
      return posts
    }
    return posts.filter((post) => {
      return post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
  }

}
