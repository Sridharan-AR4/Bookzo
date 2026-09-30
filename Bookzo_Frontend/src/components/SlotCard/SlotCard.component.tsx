import { Stack as MuiStack, Typography as MuiTypography } from '@mui/material';

import { currencyFormatter } from '@utils';

import { SlotCardWrapper } from './SlotCard.styles';
import { SlotCardProps } from './SlotCard.types';

/**
 * SlotCard component displays a movie show slot.
 * It shows the slot time and visual booking status.
 */
export const SlotCard = (props: SlotCardProps) => {
    const { slotTime, bookedPercentage, language, price, ...rest } = props;

    return (
        <SlotCardWrapper
            slotTime={slotTime}
            // pass booking percentage to style availability (color/indicator)
            bookedPercentage={bookedPercentage}
            component="button"
            {...rest}
        >
            <MuiStack alignItems="center" spacing={0.5}>
                {/* Time */}
                <MuiTypography variant="body1">{slotTime}</MuiTypography>

                {/* Extra Info */}
                {(price !== undefined || language) && (
                    <MuiTypography variant="caption" color="text.secondary">
                        {price !== undefined && currencyFormatter(price)}
                        {price !== undefined && language && ' • '}
                        {language}
                    </MuiTypography>
                )}
            </MuiStack>
        </SlotCardWrapper>
    );
};
