import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Client } from '../types';

export const clientsApi = createApi({
    reducerPath: 'clientsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004\n' }),
    endpoints: (builder) => ({
        getClients: builder.query<Client[], void>({
            query: () => `clients`,
        }),
    }),
});

export const { useGetClientsQuery } = clientsApi;
