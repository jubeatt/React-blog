import { useEffect, useState } from "react";
import { getAllPosts } from "../../WebAPI";
import Post from "../../components/Post";
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
LoadingOverlay.propTypes = undefined;

const StyledLoader = styled(LoadingOverlay)`
  & > ._loading_overlay_overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

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
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPosts().then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

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
      <StyledLoader
        active={isLoading}
        spinner={true}
        text="Loading your content..."
      ></StyledLoader>
    </Container>
  );
}
