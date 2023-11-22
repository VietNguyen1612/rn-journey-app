import axios from "axios";
import { PostInteface } from "../../types/post";
import { useQuery } from "@tanstack/react-query";

export interface GetAllPostsResponse {
    data: PostInteface[];
}

export interface GetAllComments {
    data: {
        postId: string,
        authorId: string,
        content: string
    }[]
}

export const useAllPosts = (
    token: string, pageSize: number, lastId: string
) => {

    const queryFn = async () => {
        let id = ``
        if (lastId) {
            id = `&lastId=${lastId}`
        }

        const { data } = await axios.get<GetAllPostsResponse>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/post?page_size=${pageSize}${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        // console.log(data.data)
        return data;
    };
    return useQuery({
        queryKey: ["list-posts"],
        queryFn,
    });
};

export const useQueryComments = (token: string, postId: string) => {
    const queryFn = async () => {
        const { data } = await axios.get<GetAllComments>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/comment?post_id=${postId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return data
    };
    return useQuery({
        queryKey: ["all-comments"],
        queryFn,
    });
}

export const addComment = async (
    token: string,
    authorId: string | undefined,
    postId: string,
    content: string
) => {
    try {

        const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/comment`,
            { postId, authorId, content },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            },
        );

        return data;
    } catch (error) {
        throw error;
    }
};
