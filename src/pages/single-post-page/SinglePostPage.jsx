import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getSinglePost,
  selectPost,
  setPost,
} from "../../redux/reducers/postsReducer";
import { useSelector, useDispatch } from "react-redux";
import { LoadingContext } from "../../contexts/LoadingContext";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import avatar from "../../assets/avatar.jpg";

const Container = styled.div`
  max-width: ${({ theme }) => theme.containerWidth};
  padding: 30px 20px;
  margin: 0 auto;
  min-height: calc(100vh - 85px - 42px);
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
const Body = styled.div``;

export default function SinglePostPage() {
  const { setIsLoading } = useContext(LoadingContext);
  const post = useSelector(selectPost);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getSinglePost(id)).then(() =>
      setTimeout(() => setIsLoading(false), 500)
    );
    return () => {
      dispatch(setPost({}));
    };
  }, [dispatch, id, setIsLoading]);

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
      <Body>
        {post.body ? <MDEditor.Markdown source={post.body} /> : "..."}
      </Body>
    </Container>
  );
}
