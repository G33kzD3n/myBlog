import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { AppRoutingModule } from './app-routing.module';
import { PostComponent } from './post/post.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenuComponent } from '../app/elements/menu/menu.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentsComponent } from './comments/comments.component';
import { StorecommentComponent } from './storecomment/storecomment.component';
import { PostTikersComponent } from './post-tikers/post-tikers.component';
import { ActivityTikerComponent } from './activity-tiker/activity-tiker.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    MenuComponent,
    PostDetailComponent,
    CommentsComponent,
    StorecommentComponent,
    PostTikersComponent,
    ActivityTikerComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
