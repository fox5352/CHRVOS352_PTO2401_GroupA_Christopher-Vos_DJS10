import { useEffect, useState } from "react";
import "./App.css";

type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

function App() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // fetch the posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setError(null); // reset error

        // validate's request status
        if (!res.ok) throw new Error("Http error: " + res.status);
        return res.json();
      })
      .then((data) => {
        // Check if data is not empty after parsing the json and set posts state
        if (data.length > 0) {
          setPosts(data);
        }
      })
      .catch((error) => {
        // Log error and set error state
        console.log(error);
        setError("Failed to fetch data");
        setPosts(null);
      });
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>Posts</h1>
      {posts && posts?.map((data) => <Card key={data.id} {...data} />)}
    </>
  );
}

// basic card component
function Card({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) {
  return (
    <div className="card">
      <h2>
        {id}.{title}
      </h2>
      <p>{body}</p>
    </div>
  );
}

export default App;
