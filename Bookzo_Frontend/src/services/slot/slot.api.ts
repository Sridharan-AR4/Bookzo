import { baseApi } from 'services/base';

import { SlotResponse } from './slot.types';

/**
 * Slot API endpoints
 */
export const slotApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetch booked seats along with slot details
         */
        getSlot: builder.query<SlotResponse, number>({
            query: (slotId) => ({
                url: `slots/${slotId}`,
                method: 'GET',
            }),
        }),
    }),
});
export const { useGetSlotQuery } = slotApi;
