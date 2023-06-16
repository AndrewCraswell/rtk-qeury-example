import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "$models/Todo";

const API_BASE_URL = "https://csharp-todo-backend.azurewebsites.net/api/v1/todo";

// Define the api using RTK Query
export const todosApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], void>({
      query: () => "",
      transformResponse: (todos: Todo[]) => todos.sort((a, b) => a.order - b.order),
      providesTags: ["Todos"],
    }),

    getTodoById: builder.query<Todo, string>({
      query: (id) => `${id}`,
      providesTags: ["Todos"],
    }),

    createTodo: builder.mutation<Todo, Partial<Omit<Todo, "id">>>({
      query: (newTodo) => ({
        url: "",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),

    updateTodo: builder.mutation<Todo, { id: string; updates: Partial<Omit<Todo, "id">> }>({
      query: ({ id, updates }) => ({
        url: `${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation<Todo, string>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const { useGetAllTodosQuery, useGetTodoByIdQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todosApi;
