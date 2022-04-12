import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../WebAPI";
import { LoadingContext } from "../../contexts/LoadingContext";
import styled from "styled-components";
import avatar from "../../assets/avatar.jpg";


const Container = styled.div`
  max-width: 1280px;
  padding: 30px 20px;
  margin: 0 auto;
`;
const Head = styled.div``;
const Info = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-right: 1em;
`;
const Text = styled.div`
  disaply: flex;
  align-items: cener;
`;
const Author = styled.div`
  font-weight: bold;
`;
const PostDate = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.gray_400};
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2em;
  border-bottom: 1px solid ${({ theme }) => theme.gray_100};
  padding-bottom: 10px;
`;
const Body = styled.div`
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-line;
`;

export default function SinglePostPage() {
  const [post, setPost] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSinglePost(id).then((data) => {
      setPost(data);
      setIsLoading(false);
    });
  }, [id, setIsLoading]);

  return (
    <Container>
      <Head>
        <Info>
          <Avatar src={avatar} />
          <Text>
            <Author>PeaNu</Author>
            <PostDate>
              Posted on{" "}
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "..."}
            </PostDate>
          </Text>
        </Info>
        <Title>{post.title || "..."}</Title>
      </Head>
      <Body>{post.body || "..."}</Body>
    </Container>
  );
}
