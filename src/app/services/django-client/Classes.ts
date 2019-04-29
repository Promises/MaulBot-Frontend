export class GameChart {
  days: any;
  counts: any;
  playerscount: any;
}

export class GameTable {
  id: number;
  botid: number;
  gamename: string;
  ownername: string;
  creatorname: string;
  map: string;
  slotstaken: number;
  totalgames: number;
  slotstotal: number;
  totalplayers: number;
  eventtime: string;
  age: string;
  players: GameTablePlayer[];
}

export class GameTablePlayer {
  username: number;
  realm: string;
  ping: string;
}

export class Comment {
  author: string;
  avatar: string;
  created_date: string;
  updated: string;
  text: string;
  replys: CommentReply[];
  superuser: boolean;
}

export class CommentReply {
  author: string;
  avatar: string;
  created_date: string;
  updated: string;

  text: string;
  superuser: boolean;
}


export class BlogDetail {
  pk: number;
  title: string;
  username: string;
  published_date: string;
  updated: string;

  avatar: string;

  text: string;
  mapfile: string;
  filename: string;
  comments: Comment[];
}

export class NotificationMenu {
  new: number;
  notifications: Notifications[];
}

export class ProfileInfo {
  username: string;
  avatar: string;
  linkedPlayers: LinkedPlayer[];
}

export class Notifications {
  pk: number;
  active: boolean;
  created_date: string;
  updated: string;

  link: string;
  title: string;
  text: string;
}

export class LoadingScreen {
  date: string;
  directory: string;
  original: string;
  converted: boolean;
  updated: string;

  zip_file: string;
}

export class PlayerStats {
  name: string;
  total_lvl: number;
  total_exp: number;
  highestDiff: number;
  player: PlayerTrack[];
}

export class PlayerTrack {
  name: string;
  realm: string;
  num_games: number;
  linkedPlayer: LinkedPlayer[];
}

export class LevelAvatar {
  name: string;
  tooltip: string;
  link: string;
  level: number;
  pk: number;
}

export class AdminStatusBar {
  approved: number;
  unapproved: number;
  bans: number;
}

export class UpdateSuggestion {
  constructor(
    public status: number,
    public pk: number,
  ) {
  }
}

export class AdminSuggestion {
  bugReports: Suggestion[];
  improvements: Suggestion[];
  unitText: Suggestion[];
  other: Suggestion[];
}

export class LinkedPlayer {
  constructor(
    public name: string,
    public username: string,
    public userid: number,
    public server: string,
    public status: string,
    public pk: number,
    public token: string,
    public total_lvl: number,
    public total_exp: number,
    public rank: number,
    public total_ranked_players: number,
  ) {
  }
}

export class LinkedPlayerForm {
  constructor(
    public name: string,
    public server: string,
  ) {
  }
}


export class Product {
  constructor(
    public pk: number,
    public title: string,
    public description: string,
    public price: string,
    public active: boolean,
    public tier: number,
  ) {
  }
}

export class LinkedPlayerToken {
  constructor(
    public token: string,
  ) {
  }
}

export class Suggestion {
  constructor(
    public pk: number,
    public title: string,
    public type: string,
    public pub_date: string,
    public updated: string,
    public status: number,
    public submittedby: string,
    public avatar: string,
    public approvedby: string,
  ) {
  }
}

export class SuggestionDetail {
  constructor(
    public pk: number,
    public title: string,
    public text: string,
    public type: string,
    public pub_date: string,
    public updated: string,
    public status: number,
    public submittedby: string,
    public avatar: string,
    public approvedby: string,
    public comments: Comment[],
  ) {
  }
}

export class SuggestionForm {
  constructor(
    public title: string,
    public text: string,
    public type: string,
  ) {
  }
}

export class BlogPostForm {
  constructor(
    public title: string,
    public text: string,
    public mapfile: string,
  ) {
  }
}

export class NewComment {
  text: string;
}


export class SignUpError {
  email: any[];
  username: any[];
  password: any[];

}

export class LoginError {
  email: any[];
  username: any[];
  password: any[];
  non_field_errors: any[];

}


export class AccountInfo {
  constructor(
    public pk: number,
    public username: string,
    public email: string,
    public avatar: string,
  ) {
  }
}

export class NewestMap {
  title: string;
  mapfile: string;
  id: number;
}

export class FrontPageInfo {
  text: string;
  id: number;
}

export class Forum {
  title: string;
  pk: number;
  description: string;
  created_date: string;
  updated: string;
  threads: number;
  comments: number;
  latest: PostSum;
}

export class PostSum {
  title: string;
  pk: number;
  poster: string;
  created_date: string;
}

export class ForumCategory {
  title: string;
  pk: number;
  description: string;
  created_date: string;
  updated: string;
  forums: Forum[];
}
