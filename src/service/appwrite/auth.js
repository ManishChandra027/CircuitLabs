import { Client, Account, ID } from "appwrite";
import config from "../../config/config";

class User {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const result = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (result) {
        //login
        return this.login({ email, password });
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async login({ email, password }) {
    try {
      const result = await this.account.createEmailPasswordSession({
        email,
        password,
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getAccount() {
    try {
      const result = await this.account.get();
      return result;
    } catch (err) {}
  }

  async logout() {
    try {
      const result = await this.account.deleteSessions();
      console.log(result);

      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
const user = new User();
export default user;
