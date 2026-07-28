import { useNavigate } from "react-router-dom";

import Button from "../../components/ui/Button";
import Page from "../../components/layout/Page";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Page>
      <h1>Room Not Found</h1>

      <p>
        The room you're looking for doesn't exist or the room code is invalid.
      </p>

      <Button onClick={() => navigate("/")}>
        Back Home
      </Button>
    </Page>
  );
}