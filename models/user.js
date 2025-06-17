import bcrypt from "bcryptjs";

class User {
  constructor(id, firstname, surname, email, password_hash) {
    this.id = id;
    this.firstname = firstname;
    this.surname = surname;
    this.email = email;
    this.password_hash = password_hash;
  }

  // Skapar ett konto-objekt från inkommande request-data
  static async fromRequest(body) {
    const { firstname, surname, email, password } = body;

    const password_hash = await bcrypt.hash(password, 10);

    return new User(
      null, // id sätts av databasen
      firstname,
      surname,
      email,
      password_hash
    );
  }

  // Jämför lösenord mot det hashede värdet
  async verifyPassword(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password_hash);
  }

  // Returnerar endast säker och publik data för frontend
  toPublic() {
    return {
      firstname: this.firstname,
      surname: this.surname,
      email: this.email,
    };
  }
}

export default User;
