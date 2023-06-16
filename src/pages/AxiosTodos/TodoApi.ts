import { Todo } from "$models/Todo";
import axios from "axios";

const API_BASE_URL = "https://csharp-todo-backend.azurewebsites.net/api/v1/todo";

class TodoService {
  // Retrieve all todos
  async getAllTodos(): Promise<Todo[]> {
    const response = await axios.get<Todo[]>(API_BASE_URL);
    return response.data;
  }

  // Retrieve a specific todo
  async getTodoById(id: string): Promise<Todo> {
    const response = await axios.get<Todo>(`${API_BASE_URL}/${id}`);
    return response.data;
  }

  // Create a new todo
  async createTodo(newTodo: Omit<Todo, "id">): Promise<Todo> {
    const response = await axios.post<Todo>(API_BASE_URL, newTodo, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }

  // Update an existing todo
  async updateTodo(id: string, updates: Partial<Omit<Todo, "id">>): Promise<Todo> {
    const response = await axios.patch<Todo>(`${API_BASE_URL}/${id}`, updates, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }

  // Delete a todo
  async deleteTodo(id: string): Promise<Todo> {
    const response = await axios.delete<Todo>(`${API_BASE_URL}/${id}`);
    return response.data;
  }
}

export const TodoApi = new TodoService();
