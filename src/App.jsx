import { useMutation, useQuery } from "@tanstack/react-query";

export default function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }).then((res) => res.json()),
  });

  if (error || isError) return <div>There was an error</div>;
  if (isLoading) return <div>Data is loading...</div>;

  return (
    <div>
      {isPending && <p>Data is pending</p>}
      <button
        onClick={() =>
          mutate({
            userId: 1,
            id: 500000,
            title: "Muhriddi title",
            body: "Muhriddin description",
          })
        }
      >
        Add
      </button>

      {data.map((todo) => (
        <div key={todo.id}>
          <h4>ID: {todo.id}</h4>
          <h4>Title: {todo.title}</h4>
          <p>{todo.body}</p>
        </div>
      ))}
    </div>
  );
}
