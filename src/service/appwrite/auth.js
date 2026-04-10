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
        return this.login({email, password});
      }
      // console.log("result of account create" + result);
      return result;
    } catch (err) {
      console.log(err + "error while account create");
    }
  }

  async login({ email, password }) {
    try {
      const result = await this.account.createEmailPasswordSession({
        email,
        password,
      });

      // console.log("result of account login" + result);
      return result;
    } catch (err) {
      console.log(err + "error while account login");
    }
  }

  async getAccount() {
    try {
      const result = await this.account.get();
      // console.log("get account:" + result);
      return result;
    } catch (err) {
      // console.log("error whilr getAccount: " + err);
    }
  }

  async logout() {
    try {
      const result = await this.account.deleteSessions();
      console.log("logout succesful:" + result);

      return result;
    } catch (err) {
      console.log("error whilr logout: " + err);
    }
  }
}
const user = new User();
export default user
