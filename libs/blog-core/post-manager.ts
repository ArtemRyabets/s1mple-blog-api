
export interface DatabaseClient {
    post: {
        findMany: () => Promise<any[]>;
        create: (args: { data: any }) => Promise<any>;
    };
}


export interface CreatePostDto {
    title: string;
    content: string;
    author: string;
}


export class BlogManager {
    private db: DatabaseClient;


    constructor(databaseClient: DatabaseClient) {
        this.db = databaseClient;
    }

    async getAllPosts() {
        console.log('BlogManager: Fetching all posts...');
        return await this.db.post.findMany();
    }

    async createPost(postData: CreatePostDto) {
        console.log('BlogManager: Creating a new post...');
        
        
        if (!postData.title || !postData.content) {
            throw new Error("Title and content are required!");
        }

        return await this.db.post.create({
            data: {
                title: postData.title,
                content: postData.content,
                author: postData.author,
            },
        });
    }
}