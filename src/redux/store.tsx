import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk'
import type { } from 'redux-thunk/extend-redux'

import { DataProviderProps } from '@config/types'
import rootReducer from './reducer'

const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const DataProvider = ({ children }: DataProviderProps) => {
  return (
    <Provider store={store} >
      {children}
    </Provider>
  )
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default DataProvider