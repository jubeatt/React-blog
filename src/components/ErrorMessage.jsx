import styled from "styled-components";
import PropType from "prop-types";

const ErrorBlock = styled.div`
  color: ${({ theme }) => theme.red_400};
  margin: 20px 0;
`;

export default function ErrorMessage({ message }) {
  return <ErrorBlock>{message}</ErrorBlock>;
}

ErrorMessage.propTypes = {
  message: PropType.string,
};
