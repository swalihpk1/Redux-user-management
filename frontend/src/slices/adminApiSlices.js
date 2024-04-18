import { apiSlice } from "./apiSlices";
const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST'
            })
        }),
        getUsersData: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/users`,
                method: 'GET',
            })
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/users/delete?id=${data}`,
                method: 'DELETE',
            })
        }),
        getUpdateUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/users/update?id=${data}`,
                method: 'GET',
            })
        }),
        updateUserData: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/users/update`,
                method: 'PUT',
                body: data
            })
        }),
        addNewUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/users/add`,
                method: 'POST',
                body: data
            })
        })

    })
});

export const { useAdminLoginMutation, useAdminLogoutMutation,
    useGetUsersDataMutation, useDeleteUserMutation,
    useGetUpdateUserMutation, useUpdateUserDataMutation,
    useAddNewUserMutation } = adminApiSlice;