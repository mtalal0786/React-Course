import config from "../config/config.js"
import { Client,Account,ID} from "appwrite"

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.account = new Account (this.client)
    }
    async createAccount ({email,password,name}) {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                //call an other method
                return this.login({email,password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw new Error(`Failed to create account for ${email}: ${error.message}`);
        }
    }

    async login ({email,password}) {
        try {
            return await this.account.createEmailPasswordSession(email,password);

        } catch (error) {
            throw new Error(`Failed to log in with email ${email}: ${error.message}`);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.message.includes("User (role: guests) missing scope (account)")) {
                console.warn("User is not authenticated or session has expired.");
                return null; // Indicating no user is logged in
            } else {
                throw new Error(`Failed to retrieve current user: ${error.message}`);
            }
        }
    }
    

    async logout () {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw new Error(`Failed to log out: ${error.message}`);
            
        }
    }
}

const authService = new AuthService();  //object

export default authService;


