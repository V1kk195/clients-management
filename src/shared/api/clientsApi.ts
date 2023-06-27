import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Client, Report, ReportData } from '../types';

const baseUrl = 'http://localhost:3004';

export const clientsApi = createApi({
    reducerPath: 'clientsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Clients'],
    endpoints: (builder) => ({
        getClients: builder.query<Client[], string | void>({
            query: (value?: string) =>
                `clients${value ? `?name=${value}` : ''}`,
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
        addClient: builder.mutation<Client, Partial<Client> | void>({
            query: (body = {}) => {
                return {
                    url: `clients`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
        }),
        deleteClient: builder.mutation<Client, string>({
            query: (id) => {
                return {
                    url: `clients/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
        }),
        addReportToClient: builder.mutation<Report, string>({
            query: (clientId: string) => ({
                url: `clients/${clientId}/add_report`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
        }),
        deleteReport: builder.mutation<
            void,
            { clientId: string; reportId: string }
        >({
            query: ({ clientId, reportId }) => {
                return {
                    url: `clients/${clientId}/reports/${reportId}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
        }),
        addDataToReport: builder.mutation<ReportData, string>({
            query: (reportId: string) => ({
                url: `reports/${reportId}/add_data`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Clients', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetClientsQuery,
    useAddClientMutation,
    useAddReportToClientMutation,
    useAddDataToReportMutation,
    useDeleteClientMutation,
    useDeleteReportMutation,
} = clientsApi;
