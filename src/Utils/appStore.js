import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from "./feedSlice";
import connectionReducer from './connectionSlice'; // Ensure this is correctly imported
import requestsReducer from "./resquestsSlice";
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer, // Correct key name
        requests:requestsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export default appStore;
