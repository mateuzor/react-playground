import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 32px;

  justify-content: center;

  padding-top: 64px;
`;

export const Album = styled.div`
  border: 1px solid #292929;
  background-color: #292929;

  border-radius: 8px;

  width: 600px;
  height: 350px;

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
`;

export const Title = styled.h2`
  margin-bottom: 8px;
`;

export const Username = styled.p`
  color: #ccc;
`;
