import React from "react";
import styled from "styled-components";

export default function Volume() {
  const setVolume = (e) => {};
  return (
    <Container>
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
    margin-right: 2.3rem;
  }
`;
