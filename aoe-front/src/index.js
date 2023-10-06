import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import App from './App'
import pageReducer from './reducers/pageReducer'
import civReducer from './reducers/civReducer'

const store = configureStore({
  reducer: {
    page: pageReducer,
    civ: civReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)