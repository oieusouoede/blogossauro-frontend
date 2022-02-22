import { Post } from "./Post"

export class User {
  public id: number
  public name: string
  public email: string
  public username: string
  public picture: string
  public user_role: string
  public posts: Post []
}
