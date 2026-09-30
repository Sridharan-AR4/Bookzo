/**
 * Payload for login request.
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Payload for signup request.
 * Extends login request with additional user details.
 */
export interface SignupRequest extends LoginRequest {
    first_name: string;
    phone_number?: string;
}
