import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Client } from '../types';

const baseUrl = 'http://localhost:3004';

export const clientsApi = createApi({
    reducerPath: 'clientsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Clients'],
    endpoints: (builder) => ({
        getClients: builder.query<Client[], void>({
            query: () => `clients`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: 'Clients', id } as const)
                          ),
                          { type: 'Clients', id: 'LIST' },
                      ]
                    : [{ type: 'Clients', id: 'LIST' }],
        }),
        addClient: builder.mutation<Client, Partial<Client>>({
            query(body) {
                return {
                    url: `clients`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
        }),
    }),
});

export const { useGetClientsQuery, useAddClientMutation } = clientsApi;
