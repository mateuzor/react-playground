import "./App.css";
import Banner from "./components/Banner/Banner";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage/TodoPage";
import FollowersPage from "./pages/FollowersPage/FollowersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage />}>
        <Route path="/followers" element={<FollowersPage />} />
      </Route>
    </Routes>
    // <div className="App">
    //   <Banner />
    //   <Switch>
    //     <Route strict exact path="/" component={TodoPage} />
    //     <Route strict exact path="/followers" component={FollowersPage} />
    //   </Switch>
    // </div>
  );
}

export default App;
