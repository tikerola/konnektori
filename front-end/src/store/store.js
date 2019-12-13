import { createStore, combineReducers, applyMiddleware } from 'redux'
import usersReducer from '../reducers/user'
import profilesReducer from '../reducers/profiles'
import searchReducer from '../reducers/search'
import mailReducer from '../reducers/mail'
import notificationReducer from '../reducers/notification'
import chatReducer from '../reducers/chat'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
//import logger from 'redux-logger'
import thunk from 'redux-thunk'

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'profiles', 'search', 'mail', 'notification', 'chat']
}

const rootReducer = combineReducers({
  user: usersReducer,
  profiles: profilesReducer,
  search: searchReducer,
  mail: mailReducer,
  notification: notificationReducer,
  chat: chatReducer
})

export const store = createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(thunk))

export const persistor = persistStore(store)
