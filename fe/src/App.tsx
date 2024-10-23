import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Clear,
  Page404,
} from './components'

const App = () => {

  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Clear />} />
            <Route path="/happyscreen" element={<Clear />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
