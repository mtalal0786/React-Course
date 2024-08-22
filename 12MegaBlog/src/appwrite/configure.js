import config from "../config/config.js";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client) 
        this.bucket = new Storage(this.client)
    }

    async createPost ({title,slug,content,featuredImage,status,userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw new Error(`Failed to create Post: ${error.message}`);         
        }   
    }

    async updatePost (slug,{title,content,featuredImage,status}) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw new Error(`Failed to update Post: ${error.message}`);
        }
    }

    async deletePost (slug) {
    try {
        return await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
            )
        return true
    } catch (error) {
        throw new Error(`Failed to delete Post: ${error.message}`);
        return false
    }
    }

    async getPost (slug) {
        try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
            )

        } catch (error) {
            throw new Error(`Failed to get Post: ${error.message}`);
            return false
        }
    }

    async getPosts (quaries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                quaries
                )
        } catch (error) {
            throw new Error(`Failed to get Posts: ${error.message}`);
            return false
        }
    }
    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,   

            )
        } catch (error) {
            throw new Error(`Failed to upload file: ${error.message}`);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
                )
            return true
        } catch (error) {
            throw new Error(`Failed to delete file: ${error.message}`);
            return false
        }
    }

    getFilePeview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()

export default service;