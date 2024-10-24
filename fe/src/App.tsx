import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Card, Waiting, Result, ErrorPage } from './components'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/card" element={<Card />} />
          <Route path="/waiting" element={<Waiting />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<ErrorPage statusCode={404} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
