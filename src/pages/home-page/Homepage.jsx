import { useEffect, useState, useContext, useCallback } from "react";
import { deletePost } from "../../WebAPI";
import { MEDIA_PC } from "../../constants/breakpoint";
import { LoadingContext } from "../../contexts/LoadingContext";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../../WebAPI";
import { setUser, selectUser } from "../../redux/reducers/userReducer";
import { getAuthToken, setAuthToken } from "../../utiles";
import {
  getAllPosts,
  selectAllPosts,
  selectTotalPage,
  LIMIT,
} from "../../redux/reducers/postsReducer";
import Post from "../../components/Post";
import styled from "styled-components";

const Container = styled.div`
  max-width: ${({ theme }) => theme.containerWidth};
  padding: 10px 20px;
  margin: 0 auto;
  min-height: calc(100vh - 85px - 42px);
`;

const PageTitle = styled.h2`
  padding-left: 0.5em;
  border-left: 4px solid ${({ theme }) => theme.green_400};
  margin: 20px 0 40px 0;
`;

const PostList = styled.ul`
  list-style-type: none;
`;

const Pagination = styled.div`
  padding: 20px 0;
`;
const PaginationHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.gray_400};
`;
const PaginationBody = styled.div`
  display: flex;
  justify-content: center;
`;
const PaginationButton = styled.button`
  padding: 6px 18px;
  color: ${({ theme }) => theme.green_400};
  border: 1px solid ${({ theme }) => theme.green_400};
  background-color: white;
  font-family: inherit;
  font-size: 0.75em;
  border-radius: 2px;
  cursor: pointer;
  & + & {
    margin-left: 4px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.green_400};
    color: white;
  }
  ${MEDIA_PC} {
    font-size: 1em;
  }
`;

export default function HomePage() {
  const { setIsLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const totalPage = useSelector(selectTotalPage);
  const user = useSelector(selectUser);
  const [page, setPage] = useState(1);

  const handleChangePage = useCallback(
    direction => {
      if (direction === "first") return setPage(1);
      if (direction === "next") return setPage(prev => prev + 1);
      if (direction === "back") return setPage(prev => prev - 1);
      if (direction === "last") return setPage(totalPage);
    },
    [totalPage]
  );

  const handleDeletePost = async id => {
    setIsLoading(true);
    await deletePost(id);
    dispatch(getAllPosts(page, LIMIT)).then(() => setIsLoading(false));
  };

  // 抓文章
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // 為了較好的 UX 而加的延遲
    dispatch(getAllPosts(page, LIMIT)).then(() =>
      setTimeout(() => setIsLoading(false), 500)
    );
  }, [page, setIsLoading, dispatch]);

  // 抓登入狀態
  useEffect(() => {
    if (user) return;
    const token = getAuthToken();
    if (token === "null") return;
    getMe().then(res => {
      if (res.ok === 0) {
        return setAuthToken(null);
      }
      dispatch(setUser(res));
    });
  }, [dispatch, user]);

  return (
    <Container>
      <PageTitle>首頁</PageTitle>
      <PostList>
        {posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            createdAt={post.createdAt}
            handleDeletePost={handleDeletePost}
          />
        ))}
      </PostList>
      <Pagination>
        <PaginationHeader>
          目前在第 {page} 頁，總共有 {totalPage} 頁
        </PaginationHeader>
        <PaginationBody>
          {page !== 1 && (
            <>
              <PaginationButton onClick={() => handleChangePage("first")}>
                第一頁
              </PaginationButton>
              <PaginationButton onClick={() => handleChangePage("back")}>
                上一頁
              </PaginationButton>
            </>
          )}

          {page < totalPage && (
            <>
              <PaginationButton onClick={() => handleChangePage("next")}>
                下一頁
              </PaginationButton>
              <PaginationButton onClick={() => handleChangePage("last")}>
                最後一頁
              </PaginationButton>
            </>
          )}
        </PaginationBody>
      </Pagination>
    </Container>
  );
}
