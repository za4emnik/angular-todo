export class Task {
  constructor(public name: String,
              public id?: String,
              public position?: Number,
              public aasm_state?: String,
              public deadline?: Date,
              public editable?: Boolean,
              public numberOfComments?
            ){}
}
