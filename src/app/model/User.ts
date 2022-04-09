import { Post } from './Post';

export class User {
  public id: number;
  public name: string;
  public email: string;
  public biography: string;
  public username: string;
  public picture: string;
  public user_role: string;
  public passwd: string;
  public posts: Post[];
}
