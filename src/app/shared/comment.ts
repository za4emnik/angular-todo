export class Comment {
  constructor(public message: String,
              public attachment?: any,
              public id?: Number,
              public created_at?: String
            ){}
}
