import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  AccountInfo, AdminStatusBar, AdminSuggestion,
  BlogDetail, ForumCategory, FrontPageInfo,
  GameChart,
  GameTable, LevelAvatar,
  LinkedPlayer,
  LinkedPlayerToken, LoadingScreen, NewestMap, NotificationMenu,
  PlayerStats, Product, ProfileInfo,
  Suggestion,
  SuggestionDetail
} from './Classes';
import {environment} from '../../../environments/environment';

@Injectable()
export class DjangoClientService {
  suffix = environment.API_URL;
  tableApiURL = this.suffix + '/api/getGameTable?format=json';
  chartApiURL = this.suffix + '/api/getGameCharts?format=json';
  blogDetailUrl = this.suffix + '/api/blogPosts/';
  suggestionDetailUrl = this.suffix + '/api/suggestions/';
  mySuggestionsUrl = this.suffix + '/api/mySuggestions';
  suggestionListUrl = this.suffix + '/api/suggestions';
  highScoresUrl = this.suffix + '/api/playerStats';
  getLinkedPlayerUrl = this.suffix + '/api/linkedPlayer';
  getAccountInfoUrl = this.suffix + '/api/user';
  getLevelAvatarsUrl = this.suffix + '/api/user/avatars';
  getSpecialAvatarsUrl = this.suffix + '/api/user/SpecialAvatars';
  getAdminStatusBarUrl = this.suffix + '/api/admin/getStatuses';
  getAdminSuggestionsUrl = this.suffix + '/api/admin/getSuggestions';
  getAdminTodosUrl = this.suffix + '/api/admin/getTodos';
  getNotificationsUrl = this.suffix + '/api/data/getNotifications';
  clearNotificationsUrl = this.suffix + '/api/data/clearNotifications';
  LoadingScreenUrl = this.suffix + '/api/tools/loadingScreen';
  getProfileUrl = this.suffix + '/api/profile/';
  NewestMapUrl = this.suffix + '/api/tools/newestMap';
  FrontPageInfoURL = this.suffix +'/api/tools/frontPageInfo';
  FrontPageHostsURL = this.suffix +'/api/tools/frontPageHosts';

  // STORE
  getProductsUrl = this.suffix + '/api/shop/products';


  constructor(private http: HttpClient) {
  }

  getGameTable() {
    return this.http.get<GameTable[]>(this.tableApiURL);
  }

  getGameChart() {
    return this.http.get<GameChart[]>(this.chartApiURL);
  }

  getBlogDetail(pk) {
    return this.http.get<BlogDetail>(this.blogDetailUrl + pk);
  }

  getSuggestionDetail(pk) {
    return this.http.get<SuggestionDetail>(this.suggestionDetailUrl + pk);
  }

  listSuggestions() {
    return this.http.get<Suggestion[]>(this.suggestionListUrl);
  }

  getMySuggestions() {
    return this.http.get<Suggestion[]>(this.mySuggestionsUrl);
  }

  newSuggestion(suggestion) {
    return this.http.post<any>(this.suggestionListUrl, suggestion);
  }

  newSuggestionComment(comment, pk) {
    return this.http.post<any>(this.suggestionDetailUrl + pk + '/comment', comment);
  }

  newBlogComment(comment, pk) {
    return this.http.post<BlogDetail>(this.blogDetailUrl + pk + '/comment', comment);
  }

  getHighscores() {
    return this.http.get<PlayerStats[]>(this.highScoresUrl);
  }

  getLinkedPlayer() {
    return this.http.get<LinkedPlayer[]>(this.getLinkedPlayerUrl);
  }

  getLinkedPlayerToken(pk) {
    return this.http.get<LinkedPlayerToken>(this.getLinkedPlayerUrl + '/' + pk);
  }

  newLinkedPlayer(player) {
    return this.http.post<any>(this.getLinkedPlayerUrl, player);
  }

  getAccountInfo() {
    return this.http.get<AccountInfo>(this.getAccountInfoUrl);
  }

  getLevelAvatars() {
    return this.http.get<LevelAvatar[]>(this.getLevelAvatarsUrl);
  }

  setLevelAvatars(avatar) {
    return this.http.post<any>(this.getLevelAvatarsUrl, avatar);
  }

  getSpecialAvatars() {
    return this.http.get<LevelAvatar[]>(this.getSpecialAvatarsUrl);
  }

  setSpecialAvatars(avatar) {
    return this.http.post<any>(this.getSpecialAvatarsUrl, avatar);
  }

  getAdminStatusBar() {
    return this.http.get<AdminStatusBar>(this.getAdminStatusBarUrl);
  }

  getAdminSuggestions() {
    return this.http.get<AdminSuggestion>(this.getAdminSuggestionsUrl);
  }

  getAdminTodos() {
    return this.http.get<AdminSuggestion>(this.getAdminTodosUrl);
  }

  updateSuggestionStatus(data) {
    return this.http.post<any>(this.getAdminSuggestionsUrl, data);
  }

  getProducts() {
    return this.http.get<Product[]>(this.getProductsUrl);
  }

  getProduct(pk) {
    return this.http.get<Product>(this.getProductsUrl + '/' + pk);
  }

  getNotifications() {
    return this.http.get<NotificationMenu>(this.getNotificationsUrl);
  }

  MarkNotification(pk) {
    return this.http.get<any>(this.getNotificationsUrl + '/' + pk);
  }

  ClearNotifications() {
    return this.http.get<any>(this.clearNotificationsUrl);
  }

  getLoadingScreens() {
    return this.http.get<LoadingScreen[]>(this.LoadingScreenUrl);
  }

  newLoadingScreen(loadingscreen) {
    return this.http.post<any[]>(this.LoadingScreenUrl, loadingscreen);
  }

  getProfileInfo(profileName: string) {
    return this.http.get<ProfileInfo>(this.getProfileUrl + profileName);
  }

  getProfileSuggestions(profileName: string) {
    return this.http.get<Suggestion[]>(this.suffix + `/api/profile/${profileName}/suggestions`);
  }

  getNewestMap() {
    return this.http.get<NewestMap>(this.NewestMapUrl);
  }

  getFrontPageInfo() {
    return this.http.get<FrontPageInfo>(this.FrontPageInfoURL);
  }

  getFrontPageHosts() {
    return this.http.get<FrontPageInfo>(this.FrontPageHostsURL);
  }

  getForums() {
    return this.http.get<ForumCategory[]>(`${this.suffix}/api/forums`);
  }
}
