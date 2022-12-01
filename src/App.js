import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TopBar from './containers/TopBar'
import LottoDefi from './pages/LottoDefi'
import OneDigiLotto from './pages/OneDigiLotto'
import ThreeDigiLotto from './pages/ThreeDigiLotto'

function App() {
  return (
    <>
    <TopBar />
      <Routes>
        <Route index element={<LottoDefi />}>
        </Route>
        <Route path="/oneDigiLotto" element={<OneDigiLotto />}>
        </Route>
        <Route path="/threeDigiLotto" element={<ThreeDigiLotto />}>
        </Route>
      </Routes>
    </>
  )
}

export default App
