import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { PATHS } from '@constants';
import { useUser } from '@hooks';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, isUserLoading } = useUser();

    if (!user && !isUserLoading) {
        return <Navigate to={PATHS.LOGIN} replace />;
    }

    return children;
};
