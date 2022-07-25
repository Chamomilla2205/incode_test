import * as bcrypt from 'bcrypt';

export class Password {
  static async toHash(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(5);

      return bcrypt.hash(password, salt);
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
      return bcrypt.compare(suppliedPassword, storedPassword);
  }
}