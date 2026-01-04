import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/redux/baseQueryWithReauth";

export const centerApi = createApi({
    reducerPath: "centerApi",
    tagTypes: ['Center'],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        //1. Get center by ID
        getCenterById: builder.query({
            query: (centerId) => `/centers/${centerId}`,
            providesTags: (result, error, centerId) => [{ type: 'Center', id: centerId }],
        }),

        // 2. Create a center
        createCenter: builder.mutation({
            query: (centerData) => ({
                url: "/centers",
                method: "POST",
                body: centerData
            }),
            invalidatesTags: [{ type: 'Center', id: 'LIST' }],
        }),

        // 3. Update a center
        updateCenter: builder.mutation({
            query: ({ centerData, centerId }) => ({
                url: `/centers/${centerId}`,
                method: "PATCH",
                body: centerData
            }),
            invalidatesTags: (result, error, { centerId }) => [
                { type: 'Center', id: centerId },
                { type: 'Center', id: 'LIST' },
            ],
        }),

        // 4. Delete a center
        deleteCenter: builder.mutation({
            query: (centerId) => ({
                url: `/centers/${centerId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, centerId) => [
                { type: 'Center', id: centerId },
                { type: 'Center', id: 'LIST' },
            ],
        }),

        // 5. GET ALL centers
        getAllCenters: builder.query({
            query: (params) => ({
                url: '/centers',
                params: params
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                        // Tag each item in the list
                        ...result.items.map(({ id }) => ({ type: 'Center', id: id })),
                        // Tag the list itself
                        { type: 'Center', id: 'LIST' },
                    ]
                    : [{ type: 'Center', id: 'LIST' }],
        })
    }),
});

export const {
    useGetCenterByIdQuery,
    useCreateCenterMutation,
    useUpdateCenterMutation,
    useDeleteCenterMutation,
    useGetAllCentersQuery,
} = centerApi;