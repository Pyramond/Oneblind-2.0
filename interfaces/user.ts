export default interface User {
  id: string;
  name: string;
  points: number;
  creationDate: {
    seconds: number;
    nanoseconds: number;
  };
}
