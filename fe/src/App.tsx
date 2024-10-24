import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Waiting, Page404 } from './components'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/waiting" element={<Waiting />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
