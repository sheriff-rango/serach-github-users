import React, { useState, useLayoutEffect } from 'react'
import { Router, Routes, Route, Navigate } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import GlobalStyle from './styles/global'
import UserLIst from './pages/users'
import UserDetail from './pages/userDetail'

import './App.css'

const history = createBrowserHistory()

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return <Router {...props} location={state.location} navigationType={state.action} navigator={history} />
}

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <CustomRouter history={history}>
        <Routes>
          <Route path="/users" element={<UserLIst />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="*" element={<Navigate replace to="/users" />} />
        </Routes>
      </CustomRouter>
    </div>
  )
}

export default App
