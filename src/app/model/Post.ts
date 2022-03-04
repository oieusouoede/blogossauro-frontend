import { Subject } from './Subject';
import { User } from './User';

export class Post {
  public id: number;
  public title: string;
  public content: string;
  public picture: string;
  public creation_date: Date;
  public subject: Subject;
  public author: User;
}
