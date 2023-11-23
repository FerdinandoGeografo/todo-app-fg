import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosStorageService {
  http = inject(HttpClient);

  private starterDataSource = '../../assets/data/data.json';
  private dataKey = 'todos';

  get todosSource() {
    const todos = localStorage.getItem(this.dataKey);

    return todos !== null
      ? of(JSON.parse(todos) as Todo[])
      : this.http.get<Todo[]>(this.starterDataSource);
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSource.pipe(
      tap((todos) => localStorage.setItem(this.dataKey, JSON.stringify(todos)))
    );
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.todosSource.pipe(
      map((todos) => {
        const newTodo: Todo = {
          ...todo,
          id: todos.length ? todos[todos.length - 1].id! + 1 : 1,
        };
        localStorage.setItem(this.dataKey, JSON.stringify([...todos, newTodo]));
        return newTodo;
      })
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.todosSource.pipe(
      map((todos) => {
        console.log('todo: ', todo);
        localStorage.setItem(
          this.dataKey,
          JSON.stringify(todos.map((t) => (t.id === todo.id ? todo : t)))
        );
        return todo;
      })
    );
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.todosSource.pipe(
      map((todos) => {
        const deleted: Todo = todos[id - 1];
        localStorage.setItem(
          this.dataKey,
          JSON.stringify(todos.filter((t) => t.id !== id))
        );
        return deleted;
      })
    );
  }
}
