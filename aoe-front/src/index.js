import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import App from './App'
import pageReducer from './reducers/pageReducer'
import civReducer from './reducers/civReducer'
import puReducer from './reducers/powerunitReducer'
import tokenReducer from './reducers/tokenReducer'
import errorReducer from './reducers/errorReducer'
import userReducer from './reducers/userReducer'
import statsReducer from './reducers/statsReducer'

const store = configureStore({
  reducer: {
    page: pageReducer,
    civs: civReducer,
    powerunits: puReducer,
    token: tokenReducer,
    errorMessage: errorReducer,
    user: userReducer,
    stats: statsReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)