export interface PostInteface {
    authorId: string;
    _id: string;
    content: string;
    createdDate: Date;
    lastUpdated: Date;
    isUpdated: boolean;
    commentCount: number;
    reactionCount: number;
    likedBy: string[];
    assests: string[];
}

