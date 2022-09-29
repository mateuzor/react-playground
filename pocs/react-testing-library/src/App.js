import "./App.css";
import Banner from "./components/Banner/Banner";
import { Switch, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage/TodoPage";
import FollowersPage from "./pages/FollowersPage/FollowersPage";
import CharactersPage from "./pages/CharactersPage/CharactersPage";

function App() {
  return (
    <div className="App">
      <Banner />
      <Switch>
        <Route strict exact path="/" component={TodoPage} />
        <Route strict exact path="/followers" component={FollowersPage} />
        <Route strict exact path="/characters" component={CharactersPage} />
      </Switch>
    </div>
  );
}

export default App;
