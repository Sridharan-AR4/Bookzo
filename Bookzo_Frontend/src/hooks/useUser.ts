import { useDispatch } from 'react-redux';

import { baseApi, useGetUserQuery, useLogoutMutation } from '@services';

/**
 * Custom hook to manage user data and actions.
 * Handles fetching user info, building profile image URL,
 * and logout functionality.
 */
export const useUser = () => {
    const {
        data: user,
        isLoading: isUserLoading,
        isFetching: isUserFetching,
        refetch,
    } = useGetUserQuery();
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

    // build full image URL if profile picture exists
    const imageUrl = user?.profile_picture
        ? `${import.meta.env.VITE_BASE_URL}${user.profile_picture}`
        : undefined;

    // handle logout and redirect to home
    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch {
            // error handling
        } finally {
            dispatch(baseApi.util.resetApiState());
        }
    };

    return {
        user,
        isUserLoading,
        isUserFetching,
        imageUrl,
        handleLogout,
        refetch,
    };
};
