import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID);


        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);

            if(!user) {
                // throw new Error("Error occured while creating account");

                return user;
            }

            // Call another method to log in the user

            return this.login({ email, password });
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const currentUser = this.account.get();

            if(!currentUser) {
                throw new Error("No User is loggin in");
            }

            return currentUser;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService; // We are exporting a object made from the AuthService class so wherever we import this there we don't have to create a object everuwhere we can use its methods directly