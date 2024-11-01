import axios from "axios";
import { useState, useEffect } from "react";

export default function Posts({userId}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchposts = async () => {
          if (userId) {
            const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
            const res = await axios.get(url);
            const data = res.data;

            setPosts(data);
          }
        };
    
        fetchposts();
    }, [userId]);

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title ? post.title : null}</li>
                ))}
            </ul>
        </div>
    )
}