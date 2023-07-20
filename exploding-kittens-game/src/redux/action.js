import {
  startGame,
  flippedCard,
  catCard,
  defuseCard,
  gameOver,
  shuffleCard,
  gameResult,
  removeCard,
} from "./reducers";

export const flipCard = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { deck, defuseCards } = state.cards;
    localStorage.setItem("cards", JSON.stringify(state.cards));

    const card = deck[deck.length - 1];

    dispatch(flippedCard(card));

    if (card === "Cat Card 😼") dispatch(catCard());
    if (card === "Defuse card 🙅‍♂️") {
      const defuseCardNumber = defuseCards + 1;
      dispatch(
        defuseCard({ defuseCard: defuseCardNumber, res: "Added Defuse Card" })
      );
    }
    if (card === "Exploding Kitten card💣") {
      if (defuseCards !== 0) {
        const defuseCardNumber = defuseCards - 1;
        dispatch(
          defuseCard({ defuseCard: defuseCardNumber, res: "Defuse Card Used" })
        );
      } else {
        dispatch(gameOver());
        setTimeout(() => dispatch(startGame()), 2000);
      }
    }

    if (card === "Shuffle card 🔀") {
      dispatch(shuffleCard());
      setTimeout(() => dispatch(startGame()), 1300);
    }

    if (deck.length === 0) {
      dispatch(gameResult());
      setTimeout(() => dispatch(startGame()), 2000);
    }
    const newDeck = [...deck];
    newDeck.pop();
    dispatch(removeCard({ arry: newDeck }));
  };
};
