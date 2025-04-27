import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const getPosts = () => {
  fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json());
};

export default function App() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts(),

    staleTime: 3000,
    refetchOnWindowFocus: false,
    retry: 5,
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

    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (oldPosts) => [...oldPosts, newPost]);
    },
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
