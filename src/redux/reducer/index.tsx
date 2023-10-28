import { combineReducers } from 'redux'

import auth from './auth'
import global from './global'
import timeoff from './timeoff'
import users from './users'
import tasks from './tasks'
import notification from './notification'
import forgetRequest from './forgetRequest'
import socket from './socket'
import online from './online'

export default combineReducers({
   auth,
   global,
   users,
   tasks,
   timeoff,
   notification,
   forgetRequest,
   socket,
   online,
})