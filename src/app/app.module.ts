import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeAr from '@angular/common/locales/ar';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeArExtra from '@angular/common/locales/extra/ar'
import { RegistrationComponent } from './registration/registration.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FilterPipePipe } from './filter-pipe.pipe';

registerLocaleData(localeFr, 'fr', localeFrExtra);
registerLocaleData(localeAr, 'ar', localeArExtra)

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
    UserProfileComponent,
    RegistrationComponent,
    MyPostsComponent,
    EditProfileComponent,
    FilterPipePipe,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
