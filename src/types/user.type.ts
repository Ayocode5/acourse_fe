export default interface User {
  isLoggedIn: boolean;
  user: UserData | undefined;
}

export interface UserData {
  id?: number;
  username: string;
  email: string;
  phone_number: string;
  language: string;
  recommend_class: boolean;
  promotion: boolean;
  notification: boolean;
  latest_news: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// example data
// "id": 51,
// "username": "adick",
// "email": "adick@gmail.com",
// "phone_number": "+6208126542543",
// "language": "id",
// "recommend_class": true,
// "promotion": true,
// "notification": true,
// "latest_news": true,
// "created_at": "2022-07-31T19:15:10.985Z",
// "updated_at": "2022-07-31T19:15:10.985Z",
// "deleted_at": null
