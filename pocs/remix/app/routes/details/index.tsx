import { Location } from "history";
import { useLocation } from "@remix-run/react";
import { AlbumType } from "..";
import {
  Container,
  Album,
  Image,
  TextContainer,
  Title,
  Username,
  CommentsContainer,
  Comment,
} from "./styles";

interface State extends Location {
  state: {
    album: AlbumType;
  };
}

function Details() {
  const { state } = useLocation() as State;

  if (!state?.album) {
    return <></>;
  }

  return (
    <Container>
      <Album>
        <Image src={state.album.image} alt="Thumbnail" />
        <TextContainer>
          <Title>{state.album.title}</Title>
          <Username>{state.album.username}</Username>
        </TextContainer>
        <CommentsContainer>
          <Title marginBottom={32}>Comentários</Title>
          {console.log(state.album.comments)}
          {state.album.comments.map((comment) => {
            return (
              <div key={Math.random()}>
                <Comment>{comment.comment}</Comment>
                <Username>{comment.username}</Username>
              </div>
            );
          })}
        </CommentsContainer>
      </Album>
    </Container>
  );
}

export default Details;
