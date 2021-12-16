import { Lecture } from './lecture'

export class Module {
    readonly lectures: Array<Lecture> = []
    private name: string
    constructor (name: string) {
      this.name = name
    }

    add (lecture: Lecture): void {
      this.lectures.push(lecture)
    }
}
