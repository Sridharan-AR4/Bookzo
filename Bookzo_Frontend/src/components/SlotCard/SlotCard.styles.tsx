import { Box as MuiBox, styled } from '@mui/material';

import { SlotCardProps } from './SlotCard.types';

export const SlotCardWrapper = styled(MuiBox, {
    shouldForwardProp: (prop) =>
        prop !== 'slotTime' && prop !== 'bookedPercentage',
})<SlotCardProps>(({ bookedPercentage = 0, theme }) => {
    const {
        typography: { pxToRem },
        spacing,
    } = theme;
    return {
        padding: spacing(1, 3),
        borderWidth: pxToRem(2),
        borderStyle: 'solid',
        borderColor:
            bookedPercentage < 50
                ? 'green'
                : bookedPercentage < 80
                  ? 'yellow'
                  : bookedPercentage < 100
                    ? 'red'
                    : 'gray',
        cursor: bookedPercentage < 100 ? 'pointer' : 'default',
        width: 'fit-content',
        backgroundColor: bookedPercentage < 100 ? 'white' : 'lightgray',
    };
});
