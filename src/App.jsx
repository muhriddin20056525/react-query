import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  if (error) return <div>There was an error</div>;
  if (isLoading) return <div>Data is loading...</div>;

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.id}</h2>
          <h1>{todo.title}</h1>
        </div>
      ))}
    </div>
  );
}
