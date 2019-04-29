import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/layout/dashboard/dashboard.component';
import {SuggestionsComponent} from './components/suggestion/suggestions/suggestions.component';
import {BlogpostComponent} from './components/layout/blogpostDetail/blogpost.component';
import {BlogpostsComponent} from './components/layout/blogposts/blogposts.component';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import {ProfilePageComponent} from './account/profile-page/profile-page.component';
import {AuthGuard} from './account/auth/auth.guard';
import {AdminGuard} from './account/auth/admin.guard';

import {HighscoresComponent} from './components/layout/highscores/highscores.component';
import {AdminBansComponent} from './components/admin/admin-bans/admin-bans.component';
import {AdminSuggestionsComponent} from './components/admin/admin-suggestions/admin-suggestions.component';
import {AdminTodosComponent} from './components/admin/admin-todos/admin-todos.component';
import {LoadingScreenComponent} from './components/tools/loading-screen/loading-screen.component';
import {MapToolsComponent} from './components/tools/map-tools/map-tools.component';
import {LibraryHCLComponent} from './components/tools/library-hcl/library-hcl.component';
import {LibraryMMDComponent} from './components/tools/library-mmd/library-mmd.component';
import {SuggestionDetailComponent} from './components/suggestion/suggestion-detail/suggestion-detail.component';
import {ProfileInfoComponent} from "./components/layout/profile-info/profile-info.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ReusableComponentsComponent} from "./components/reusable-components/reusable-components.component";
import {ForumComponent} from './components/layout/forum/forum.component';

const routes: Routes = [
  // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'suggestions', component: SuggestionsComponent},
  {path: 'suggestions/:id', component: SuggestionDetailComponent},
  {path: 'blog/:id', component: BlogpostComponent},
  {path: 'blog', component: BlogpostsComponent},
  {path: 'highscores', component: HighscoresComponent},
  {path: 'user/profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'user/profile/:username', component: ProfileInfoComponent},
  {path: 'tools', component: MapToolsComponent},
  {path: 'tools/library/hcl', component: LibraryHCLComponent},
  {path: 'tools/library/mmd', component: LibraryMMDComponent},


  {path: 'tools/loadingscreen', component: LoadingScreenComponent, canActivate: [AuthGuard]},
  {path: 'admin/bans', component: AdminBansComponent, canActivate: [AdminGuard]},
  {path: 'admin/suggestions', component: AdminSuggestionsComponent, canActivate: [AdminGuard]},
  {path: 'admin/todo', component: AdminTodosComponent, canActivate: [AdminGuard]},

  {path: '404', component: PageNotFoundComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'markdown', component: ReusableComponentsComponent},





];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
