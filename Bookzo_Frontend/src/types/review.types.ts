export interface Review {
    id: number;
    title: string;
    description: string;
    user_id: number;
    first_name: string;
    last_name?: string;
    profile_picture: string;
    upvotes: number;
    downvotes: number;
    user_reaction: 'UPVOTE' | 'DOWNVOTE' | null;
    created_at: string;
    updated_at: string;
}
