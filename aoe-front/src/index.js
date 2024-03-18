import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
//import pageReducer from './reducers/pageReducer'
import pageStateReducer from './reducers/pageReducer'
import civReducer from './reducers/civReducer'
import puReducer from './reducers/powerunitReducer'
import tokenReducer from './reducers/tokenReducer'
import errorReducer from './reducers/errorReducer'
import userReducer from './reducers/userReducer'
import statsReducer from './reducers/statsReducer'
import topButtonsReducer from './reducers/topButtonsReducer'
import allCivsReducer from './reducers/allCivsReducer'
import matchupReducer from './reducers/matchupReducer'
import './main.css'
import allUnitsReducer from './reducers/allUnitsReducer'

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react'

const store = configureStore({
  reducer: {
    pageState: pageStateReducer,
    civs: civReducer,
    allCivs: allCivsReducer,
    allUnits: allUnitsReducer,
    powerunits: puReducer,
    token: tokenReducer,
    errorMessage: errorReducer,
    user: userReducer,
    stats: statsReducer,
    buttonsState: topButtonsReducer,
    matchup: matchupReducer,
  }
})

posthog.init(
  process.env.REACT_APP_PUBLIC_POSTHOG_KEY,
  {
    api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </Provider >
)