import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/redux/baseQueryWithReauth";

export const appointmentApi = createApi({
    reducerPath: "appointmentApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Appointment"],
    endpoints: (builder) => ({
        // ---------------------------------------------------------
        // 1. GET ALL (Paginated & Filtered)
        // ---------------------------------------------------------
        getAllAppointments: builder.query({
            query: (params = {}) => {
                // We handle the conversion from UI "Page" to Backend "Skip" here
                const { page = 1, size = 10, ...filters } = params;
                const skip = (page - 1) * size;

                return {
                    url: "/appointments/",
                    // RTK Query automatically converts this object to ?skip=0&limit=10&order_by=...
                    params: {
                        skip,
                        limit: size,
                        ...filters, // spreads search, status, order_by, order_desc
                    },
                };
            },
            providesTags: (result) =>
                result
                    ? [
                        // Tag individual items for granular updates
                        ...result.items.map(({ id }) => ({ type: "Appointment", id })),
                        // Tag the list for general refetching
                        { type: "Appointment", id: "LIST" },
                    ]
                    : [{ type: "Appointment", id: "LIST" }],
        }),

        // ---------------------------------------------------------
        // 2. GET SINGLE APPOINTMENT
        // ---------------------------------------------------------
        getAppointmentById: builder.query({
            query: (id) => `/appointments/${id}`,
            providesTags: (result, error, id) => [{ type: "Appointment", id }],
        }),

        // ---------------------------------------------------------
        // 3. CREATE (Public Pending Request)
        // ---------------------------------------------------------
        createPendingRequest: builder.mutation({
            query: (data) => ({
                url: "/appointments/pending",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Appointment", id: "LIST" }],
        }),

        // ---------------------------------------------------------
        // 4. SCHEDULE (Admin Create)
        // ---------------------------------------------------------
        scheduleAppointment: builder.mutation({
            query: (data) => ({
                url: "/appointments/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Appointment", id: "LIST" }],
        }),

        // ---------------------------------------------------------
        // 5. STATUS CHANGES (Patch Operations)
        // ---------------------------------------------------------
        // Reschedule (Time Change)
        rescheduleAppointment: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/appointments/${id}/reschedule`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Appointment", id },
                { type: "Appointment", id: "LIST" },
            ],
        }),

        // Confirm (Pending -> Confirmed)
        confirmAppointment: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/appointments/${id}/confirm`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Appointment", id },
                { type: "Appointment", id: "LIST" },
            ],
        }),

        // Cancel
        cancelAppointment: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/appointments/${id}/cancel`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Appointment", id },
                { type: "Appointment", id: "LIST" },
            ],
        }),

        // Reject (Admin Rejection)
        rejectAppointment: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/appointments/${id}/reject`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Appointment", id },
                { type: "Appointment", id: "LIST" },
            ],
        }),

        // Complete
        completeAppointment: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/appointments/${id}/complete`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Appointment", id },
                { type: "Appointment", id: "LIST" },
            ],
        }),

        // ---------------------------------------------------------
        // 6. DELETE
        // ---------------------------------------------------------
        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `/appointments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Appointment", id },
                { type: "Appointment", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetAllAppointmentsQuery,
    useGetAppointmentByIdQuery,
    useCreatePendingRequestMutation,
    useScheduleAppointmentMutation,
    useRescheduleAppointmentMutation,
    useConfirmAppointmentMutation,
    useCancelAppointmentMutation,
    useRejectAppointmentMutation,
    useCompleteAppointmentMutation,
    useDeleteAppointmentMutation,
} = appointmentApi;