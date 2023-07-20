import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStarted: false,
  cardName: "",
  playerUsername: "",
  deck: [],
  leaderboard: JSON.parse(localStorage.getItem("leaderboard")) || [],
  defuseCards: 0,
  res: "",
};

const createShuffledDeck = () => {
  const cardObject = {
    1: "Cat Card 😼",
    2: "Defuse card 🙅‍♂️",
    3: "Shuffle card 🔀",
    4: "Exploding Kitten card💣",
  };
  let cardArray = [];
  const numberOfCard = 5;
  const getRandomNumber = () => Math.floor(Math.random() * (5 - 1) + 1);
  for (let index = 0; index < numberOfCard; index++)
    cardArray.push(cardObject[getRandomNumber()]);
  return cardArray;
};

const CardGameSlice = createSlice({
  name: "card game",
  initialState: initialState,
  reducers: {
    startGame(state, action) {
      state.defuseCards = 0;
      state.gameStarted = true;
      state.cardName = "Flip the Card";
      state.playerUsername = action.payload || state.playerUsername;
      state.deck = createShuffledDeck();
      state.res = "New Cards Added";
      state.leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      localStorage.setItem("cards", JSON.stringify(state));
    },

    flippedCard(state, action) {
      console.log("cardName:", action.payload);
      state.cardName = action.payload;
    },

    catCard(state) {
      state.res = "Safe For Now";
      localStorage.setItem("cards", JSON.stringify(state));
    },

    defuseCard(state, action) {
      state.defuseCards = action.payload.defuseCard;
      state.res = action.payload.res;
      localStorage.setItem("cards", JSON.stringify(state));
    },

    gameOver(state, action) {
      state.res = "GAME LOST, will be restarted in 2 seconds";

      localStorage.setItem("cards", JSON.stringify(state));
    },

    shuffleCard(state, action) {
      state.res = "Game Reset, will be restarted in 2 seconds";
    },
    gameResult(state, action) {
      state.res = "GAME WON, will be restarted in 2 seconds";

      const existingPlayesInLeaderboard = state.leaderboard.find(
        (item) =>
          item.username.toLowerCase() === state.playerUsername.toLowerCase()
      );

      if (!existingPlayesInLeaderboard) {
        const updatedLeaderboard = [
          ...state.leaderboard,
          { username: state.playerUsername, gamesWon: 1 },
        ];
        state.leaderboard = updatedLeaderboard;
      } else {
        existingPlayesInLeaderboard.gamesWon++;
      }

      localStorage.setItem("leaderboard", JSON.stringify(state.leaderboard));
    },
    removeCard(state, action) {
      const decks = action.payload.arry;
      //decks.pop();
      state.deck = decks;
      localStorage.setItem("cards", JSON.stringify(state));
    },

    restoreState(state, action) {
      state.gameStarted = action.payload.gameStarted;
      state.cardName = action.payload.cardName;
      state.playerUsername = action.payload.playerUsername;
      state.deck = action.payload.deck;
      state.leaderboard = action.payload.leaderboard;
      state.defuseCards = action.payload.defuseCards;
      state.res = action.payload.res;
    },
    logout(state) {
      state.gameStarted = false;
    },
  },
});

export const {
  startGame,
  flippedCard,
  catCard,
  defuseCard,
  gameOver,
  shuffleCard,
  gameResult,
  removeCard,
  restoreState,
  logout,
} = CardGameSlice.actions;

export default CardGameSlice.reducer;
