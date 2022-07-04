import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Album = styled.div`
  border: 1px solid #292929;
  background-color: #292929;

  border-radius: 8px;

  width: 600px;

  padding: 0;

  text-align: start;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 250px;

  object-fit: cover;
`;

export const TextContainer = styled.div`
  padding: 16px;

  border-bottom: 1px solid #414141;
`;

export const Title = styled.h2<{ marginBottom?: number }>`
  margin-bottom: ${(props) => props.marginBottom || 8}px;
`;

export const Username = styled.p`
  color: #ccc;
`;

export const CommentsContainer = styled.div`
  padding: 16px;
`;

export const Comment = styled(Title)`
  font-size: 18px;
  font-weight: 500;
`;
