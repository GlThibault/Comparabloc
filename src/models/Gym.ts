export default class Gym {
  id?: number;
  name: string;
  grades: object;
  logo?: string;
  socialNetwork?: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };

  constructor(
    name: string,
    grades: object,
    logo?: string,
    socialNetwork?: object
  ) {
    this.name = name;
    this.grades = grades;
    this.logo = logo;
    this.socialNetwork = socialNetwork;
  }
}
