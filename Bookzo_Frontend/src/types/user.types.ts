/**
 * Response type for user profile.
 */
export interface UserResponse {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    profile_picture: string | null;
}
