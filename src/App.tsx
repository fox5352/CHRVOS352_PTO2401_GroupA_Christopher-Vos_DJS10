import { useEffect, useState } from "react";
import "./App.css";

type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // set is loading
        setError(null); // reset error

        // Fetching data from API
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        // validate's request status
        if (!res.ok) throw new Error("Http error: " + res.status);

        // Parsing JSON data from response
        const data = await res.json();

        // Check if data is not empty and set posts state
        if (data.length > 0) {
          setPosts(data);
        }
      } catch (error) {
        // Log error and set error state
        console.log(error);
        setError("Failed to fetch data");
        setPosts(null);
      } finally {
        // After attempting fetching, set loading to false
        setIsLoading(false);
      }
    };

    // call the fetch function
    fetchData();
  }, []);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

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