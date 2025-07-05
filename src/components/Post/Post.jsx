import { Card } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);

  const post = posts.map((post) => {
    return (
  <Card
        key={post._id} 
        title={post.title}
        extra={<Link to={"/posts/id/" + post._id}>More </Link>}
        style={{ width: 300 }} 
      >
        <p>{post.content}</p> 
      </Card>
    );
  });

  return (
    <div>
     {post}
    </div>
  );
};

export default Post;