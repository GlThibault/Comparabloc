export default class Gym {
  id?: number;
  name: string;
  grades: object;

  constructor(name: string, grades: object) {
    this.name = name;
    this.grades = grades;
  }
}
