import config from "../config/config.js"
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, image, status, user }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug, // We are using slug as the database id, but ID.unique() can also be used here
                {
                    title,
                    content,
                    image,
                    status,
                    user
                }
            )
        } catch (error) {
            console.log("Appwrite Service Error :: createPost :: E:", error);
        }
    }

    async updatePost(slug, { title, content, imageID, status }) {
        // const updates = {};

        // if(title) updates = {...updates, title}
        // if(content) updates = {...updates, content}
        // if(imageID) updates = {...updates, imageID}
        // if(status) updates = {...updates, status}

        // No pass this updates object in place of the object in update document method
        // This method is also correct

        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    imageID,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service Error :: updatePost :: E:", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )

            return true;
        } catch (error) {
            console.log("Appwrite Service Error :: deletePost :: E:", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service Error :: getPost :: E:", error);
            return false;
        }
    }

    async getAllActivePosts(queries = Query.equal("status", "active")) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service Error :: getAllActivePosts :: E:", error);
            return false;
        }
    }

    // File upload Services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service Error :: uploadFile :: E:", error);
            return false;
        }
    }

    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileID
            )

            return true;
        } catch (error) {
            console.log("Appwrite Service Error :: deleteFile :: E:", error);
            return false;
        }
    }

    getFilePreview(fileID) { // We don't have to use async await here beacuse this function does not return the whole file and hence not a promise either
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileID
        )
    }
}

const service = new Service();
export default service;