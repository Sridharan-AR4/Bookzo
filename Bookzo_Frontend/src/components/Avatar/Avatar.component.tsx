import {
    Avatar as MuiAvatar,
    AvatarProps as MuiAvatarProps,
    useTheme,
} from '@mui/material';

/**
 * Avatar component renders a styled user avatar.
 * It wraps MUI Avatar and applies consistent sizing using theme typography.
 */
export const Avatar = (props: MuiAvatarProps) => {
    const theme = useTheme();
    const {
        typography: { pxToRem },
    } = theme;
    const { src, sx, ...rest } = props;

    return (
        <MuiAvatar
            src={src}
            {...rest}
            sx={{
                width: pxToRem(32),
                height: pxToRem(32),
                ...(typeof sx === 'function' ? sx(theme) : sx),
            }}
        />
    );
};
