import { useEffect, useState, useContext } from "react";
import { getAllPosts } from "../../WebAPI";
import { LoadingContext } from "../../contexts/LoadingContext";
import Post from "../../components/Post";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1280px;
  padding: 10px 20px;
  margin: 0 auto;
`;

const PageTitle = styled.h2`
  padding-left: 0.5em;
  border-left: 4px solid ${({ theme }) => theme.green_400};
  margin: 20px 0 40px 0;
`;

const PostList = styled.ul`
  list-style-type: none;
`;

export default function HomePage() {
  const { setIsLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 當 render 完以後才執行。
    setIsLoading(true);
    getAllPosts().then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, [setIsLoading]);

  return (
    <Container>
      <PageTitle>首頁</PageTitle>
      <PostList>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            createdAt={post.createdAt}
          />
        ))}
      </PostList>
    </Container>
  );
}
