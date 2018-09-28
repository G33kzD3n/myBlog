import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { UserProfileComponent } from "../app/user-profile/user-profile.component";
import { RegistrationComponent } from './registration/registration.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
const routes: Routes = [
  { path: 'posts', component: PostsComponent, },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'posts/create', component: PostComponent },
  { path: 'posts/edit/:id', component: PostComponent },
  { path: 'posts/:id/comments', component: CommentsComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: 'users/:id/posts', component: MyPostsComponent },
  { path: 'register', component: RegistrationComponent }
];
@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRoutingModule { }
