import { configureStore } from "@reduxjs/toolkit";

import CardReducer from "./reducers";

const store = configureStore({
  reducer: {
    cards: CardReducer,
  },
});
export default store;
