import { useLoaderData, useNavigate } from "@remix-run/react";
import api from "~/services/api";
import {
  Container,
  Album,
  Image,
  TextContainer,
  Title,
  Username,
} from "./styles";

type CommentType = {
  username: string;
  comment: string;
};

export type AlbumType = {
  id: number;
  title: string;
  username: string;
  image: string;
  comments: CommentType[];
};

export async function loader() {
  const response = await api.get("0b498b01-c20f-49d9-8ab6-edda571b4d62");
  return response.data.albums;
}

export default function Home() {
  const albums: AlbumType[] = useLoaderData();

  const navigate = useNavigate();

  return (
    <Container>
      {albums.map((album: AlbumType) => {
        return (
          <Album
            key={album.id}
            onClick={() => navigate("details", { state: { album } })}
          >
            <Image src={album.image} alt="Thumbnail" />
            <TextContainer>
              <Title>{album.title}</Title>
              <Username>{album.username}</Username>
            </TextContainer>
          </Album>
        );
      })}
    </Container>
  );
}
