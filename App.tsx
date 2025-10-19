import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

interface Todo {
  id: number;
  text: string;
  completed: boolean; 
}

export default function App() {
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (): void => {
    if (todoText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTodoText('');
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        value={todoText}
        onChangeText={setTodoText}
        placeholder="Enter a new todo"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Add Todo" onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTodo(item.id)}>
            <Text style={{ 
              textDecorationLine: item.completed ? 'line-through' : 'none',
              fontSize: 18,
              marginVertical: 4
            }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
