export class BirdError extends Error {
  isCustomError = true;
  name: string;
  code: string;
  data: any;
  constructor({ message, code, data } : { message: string; code: string; data: any }) {
    super(message);
    this.message = message;
    this.name = 'BirdError';
    this.code = code;
    this.data = data;
  }
}
