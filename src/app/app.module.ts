import {NgtUniversalModule} from '@ng-toolkit/universal';
import {CommonModule} from '@angular/common';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TimeAgoPipe} from 'time-ago-pipe';
import {ChartsModule} from 'ng2-charts';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/layout/dashboard/dashboard.component';
import {NavBarComponent} from './components/layout/nav-bar/nav-bar.component';
import {SuggestionsComponent} from './components/suggestion/suggestions/suggestions.component';
import {ClipboardModule} from 'ngx-clipboard';

import {GameTableComponent} from './components/layout/game-table/game-table.component';
import {DjangoClientService} from './services/django-client/django-client.service';
import {BlogpostComponent} from './components/layout/blogpostDetail/blogpost.component';
import {BlogpostsComponent} from './components/layout/blogposts/blogposts.component';
import {RegisterComponent} from './account/register/register.component';
import {LoginComponent} from './account/login/login.component';
import {BlogpostsService} from './services/blogposts-service/blogposts.service';
import {PaginationserviceService} from './services/paginationservice/paginationservice.service';
import {AuthService} from './account/auth/auth.service';
import {GameChartComponent} from './components/layout/game-chart/game-chart.component';
import {ProfilePageComponent} from './account/profile-page/profile-page.component';
import {AuthGuard} from './account/auth/auth.guard';
import {AdminGuard} from './account/auth/admin.guard';

import {TokenInterceptorService} from './account/auth/token-interceptor.service';
import {LogInToCommentComponent} from './services/log-in-to-comment/log-in-to-comment.component';
import {SuggestionFormComponent} from './components/suggestion/suggestion-form/suggestion-form.component';
import {SuggestionCommentFormComponent} from './components/suggestion/suggestion-comment-form/suggestion-comment-form.component';
import {HighscoresComponent} from './components/layout/highscores/highscores.component';
import {ProfilePageLinkAccountComponent} from './account/profile-page-link-account/profile-page-link-account.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdminStatusBarComponent} from './components/admin/admin-status-bar/admin-status-bar.component';
import {AdminSuggestionsComponent} from './components/admin/admin-suggestions/admin-suggestions.component';
import {AdminTodosComponent} from './components/admin/admin-todos/admin-todos.component';
import {AdminBansComponent} from './components/admin/admin-bans/admin-bans.component';
import {SuggestionModalContent} from './services/suggestion-modal/suggestion-modal-content';
import {LoadingScreenComponent} from './components/tools/loading-screen/loading-screen.component';
import {MapToolsComponent} from './components/tools/map-tools/map-tools.component';
import {PrismModule} from '@ngx-prism/core'; // <----- Here
import {MarkdownModule} from 'ngx-markdown';
import {LibraryHCLComponent} from './components/tools/library-hcl/library-hcl.component';
import {LibraryMMDComponent} from './components/tools/library-mmd/library-mmd.component';
import {SuggestionDetailComponent} from './components/suggestion/suggestion-detail/suggestion-detail.component';
import {NotificationsComponent} from './components/layout/nav-bar/notifications/notifications.component';
import {MatIconModule, MatListModule} from '@angular/material';
import {ProfileInfoComponent} from './components/layout/profile-info/profile-info.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ReusableComponentsComponent} from './components/reusable-components/reusable-components.component';
import {MainMenuButtonComponent} from './components/reusable-components/main-menu-button/main-menu-button.component';

import {HighlightJS, HighlightModule} from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import {AceEditorModule} from 'ng2-ace-editor';
import { LoadingComponent } from './components/reusable-components/loading/loading.component';
import {WebSocketService} from './services/websocket/webSocket.service';
import {WebSocketConstants} from './services/websocket/webSocketConstants';
import {LinkifyPipe} from './services/tools/linkify.pipe';
import { ForumComponent } from './components/layout/forum/forum.component';


@NgModule({
  imports: [
    CommonModule,
    NgtUniversalModule,

    TransferHttpCacheModule,
    HttpClientModule,


    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ChartsModule,
    ClipboardModule,
    PrismModule,
    MatListModule,
    MatIconModule,
    AceEditorModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    MarkdownModule.forRoot({loader: HttpClientModule}),
  ],
  providers: [
    DjangoClientService,
    BlogpostsService,
    PaginationserviceService,
    AuthService,
    HighlightJS,
    AuthGuard,
    WebSocketService,
    WebSocketConstants,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    NavBarComponent,
    SuggestionsComponent,
    GameTableComponent,
    TimeAgoPipe,
    BlogpostComponent,
    BlogpostsComponent,
    RegisterComponent,
    LoginComponent,
    GameChartComponent,
    ProfilePageComponent,
    LogInToCommentComponent,
    SuggestionFormComponent,
    SuggestionCommentFormComponent,
    HighscoresComponent,
    ProfilePageLinkAccountComponent,
    AdminStatusBarComponent,
    AdminSuggestionsComponent,
    AdminTodosComponent,
    AdminBansComponent,
    SuggestionModalContent,
    LoadingScreenComponent,
    MapToolsComponent,
    LibraryHCLComponent,
    LibraryMMDComponent,
    SuggestionDetailComponent,
    NotificationsComponent,
    ProfileInfoComponent,
    PageNotFoundComponent,
    ReusableComponentsComponent,
    MainMenuButtonComponent,
    LoadingComponent,
    LinkifyPipe,
    ForumComponent,
  ],
  bootstrap: [AppComponent],
  entryComponents: [SuggestionModalContent],
})
export class AppModule {
}

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'java', func: java},
    {name: 'javascript', func: javascript},
    {name: 'python', func: python},
    {name: 'xml', func: xml}
  ];
}
