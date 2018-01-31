export class Comment {
  constructor(public message: String,
              public attachment?: String,
              public id?: Number,
              public created_at?: String
            ){}
}
