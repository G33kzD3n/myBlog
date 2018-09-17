import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { UserProfileComponent } from "../app/user-profile/user-profile.component";
const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'posts/create', component: PostComponent },
  { path: 'posts/:id','component': PostDetailComponent},
  {path: 'posts/edit/:id', component: PostComponent},
  { path: 'posts/:id/comments', 'component': CommentsComponent },
  { path : 'users/:id', 'component' : UserProfileComponent}
];
@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRoutingModule {}
