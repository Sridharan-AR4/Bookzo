import { ButtonBase as MuiButtonBase, styled } from '@mui/material';

import { StyledSeatProps } from './Seat.types';

export const StyledSeat = styled(MuiButtonBase, {
    shouldForwardProp: (prop) =>
        prop !== 'isAvailable' && prop !== 'isSelected',
})<StyledSeatProps>(({ isAvailable, isSelected, theme }) => {
    const {
        typography: { pxToRem },
    } = theme;

    let backgroundColor = 'gray';
    let color = 'white';
    let border = `${pxToRem(2)} solid black`;

    if (isAvailable) {
        backgroundColor = isSelected ? 'green' : 'white';
        color = isSelected ? 'white' : 'black';
        border = `${pxToRem(2)} solid green`;
    }

    return {
        padding: pxToRem(2),
        border,
        backgroundColor,
        color,
        cursor: isAvailable ? 'pointer' : 'not-allowed',
    };
});
