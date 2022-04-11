import { Link as NavLink, useLocation } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MEDIA_PC } from "../constants/breakpoint";
import { AuthContext } from "../contexts/AuthContext";
import { setAuthToken } from "../utiles";
import styled from "styled-components";

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 85px;
  background-color: white;
  box-shadow: 0px 2px 4px 0px ${({ theme }) => theme.gray_100};
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  padding: 20px;
  margin: 0 auto;
  height: 100%;
`;

const LogoBlock = styled.div``;

const Logo = styled(NavLink)`
  display: block;
  color: ${({ theme }) => theme.green_400};
  font-size: 1.5em;
  font-weight: bold;
`;

const HamBurger = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  > svg {
    width: 26px;
    height: 26px;
    color: ${({ theme }) => theme.green_400};
  }
  ${MEDIA_PC} {
    display: none;
  }
`;

const Nav = styled.nav`
  position: absolute;
  top: 85px;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 0 20px;
  ${({ $isMenuOpen }) => ($isMenuOpen ? "display: block" : "display: none")};
  ${MEDIA_PC} {
    position: static;
    display: flex;
    width: auto;
  }
`;
const List = styled.ul`
  list-style-type: none;
  padding-bottom: 20px;
  ${MEDIA_PC} {
    display: flex;
    align-items: center;
    padding-bottom: 0;
  }
`;
const Item = styled.li`
  margin-top: 10px;
  ${MEDIA_PC} {
    margin-top: 0;
    margin-left: 10px;
  }
`;
const StyledLink = styled(NavLink)`
  position: relative;
  display: block;
  padding: 8px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.green_400};
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
  ${({ $active }) => $active && `&::after{width: 100%}`};
`;

const LogOutButton = styled.button`
  position: relative;
  display: block;
  padding: 8px;
  background-color: transparent;
  border: none;
  text-align: left;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  width: 100%;
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.green_400};
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
`;

const SignUpLink = styled(NavLink)`
  display: block;
  color: white;
  background-color: ${({ theme }) => theme.green_400};
  padding: 12px 16px;
  border-radius: 4px;
`;

export default function NavBar() {
  const history = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser(null);
    setIsMenuOpen(false);
    history("/");
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <Wrapper>
      <Container>
        <LogoBlock>
          <Logo to="/">Peanu's blog</Logo>
        </LogoBlock>

        <HamBurger onClick={handleToggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </HamBurger>

        <Nav $isMenuOpen={isMenuOpen}>
          <List>
            <Item>
              <StyledLink to="/posts" $active={location.pathname === "/posts"}>
                Posts
              </StyledLink>
            </Item>
            <Item>
              <StyledLink
                to="/categories"
                $active={location.pathname === "/categories"}
              >
                Categories
              </StyledLink>
            </Item>
            <Item>
              <StyledLink to="/about" $active={location.pathname === "/about"}>
                About Me
              </StyledLink>
            </Item>
            <Item>
              {!user && (
                <StyledLink
                  to="/log-in"
                  $active={location.pathname === "/log-in"}
                >
                  Log in
                </StyledLink>
              )}
            </Item>
            <Item>
              {user && (
                <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
              )}
            </Item>
            <Item>
              <SignUpLink to="/sign-up">Sign up</SignUpLink>
            </Item>
          </List>
        </Nav>
      </Container>
    </Wrapper>
  );
}
