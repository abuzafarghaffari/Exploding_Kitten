import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { startGame, restoreState } from "./redux/reducers";
import "./App.css";
import GameCard from "./components/GameCard";
import Login from "./components/Login";
import { Box, Typography } from "@mui/material";

const BoxStyle = {
  display: "flex",
  height: "80vh",
  width: "100vw",
  justifyContent: "center",
  alignItems: " center",
};

function App() {
  const cardState = useSelector((state) => state.cards);
  const dispatch = useDispatch();

  const handleStartGame = (enteredName) => {
    const Name = enteredName[0].toUpperCase() + enteredName.slice(1);
    dispatch(startGame(Name));
  };

  useEffect(() => {
    const state = localStorage.getItem("cards");
    const StateObject = JSON.parse(state);

    if (state) {
      dispatch(restoreState(StateObject));
    }
  }, []);

  return (
    <div className="App">
      <Typography variant="h1" align="center" sx={{ margin: "1rem 0 0 2rem" }}>
        😸Exploding Kitten
      </Typography>
      {cardState.gameStarted ? (
        <GameCard />
      ) : (
        <Box sx={BoxStyle}>
          <Login onClick={handleStartGame} />
        </Box>
      )}
    </div>
  );
}

export default App;
