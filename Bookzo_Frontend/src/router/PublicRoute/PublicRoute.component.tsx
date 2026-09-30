import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { PATHS } from '@constants';
import { useUser } from '@hooks';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useUser();

    if (user) {
        return <Navigate to={PATHS.ROOT} replace />;
    }

    return children;
};
