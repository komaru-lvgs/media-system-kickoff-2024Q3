import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Auth,
  MiniGame,
  Start,
  Todo,
  Clear,
  Mistakes,
  Password,
  WhereFrom,
  RankingPerTeam,
  Puzzle,
  NervousBreakdown,
  RankingPerDepartment,
  Flash,
  FaceSwap,
  LineConnection,
  WhackMole,
  Rhythm,
} from './components'
import { CsrfToken } from './types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TimerContext } from './hooks/useTimer'
import { Twister } from './components/pages/twister'

const App = () => {
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`,
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])
  const [timeNumber, setTimeNumber] = useState<number>(0)
  return (
    <BrowserRouter>
      <TimerContext.Provider value={{ timeNumber, setTimeNumber }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/start" element={<Start />} />
            <Route path="/password-24-training" element={<Password />} />
            <Route path="/ranking-teams" element={<RankingPerTeam />} />
            <Route
              path="/ranking-departments"
              element={<RankingPerDepartment />}
            />
            <Route path="/clear-24-training" element={<Clear />} />
            <Route path="/puzzle-24-training" element={<Puzzle />} />
            <Route path="/mistakes" element={<Mistakes />} />
            <Route path="/flash-shinsotu" element={<Flash />} />
            <Route path="/face-swap" element={<FaceSwap />} />
            <Route path="/nervous-breakdown" element={<NervousBreakdown />} />
            <Route path="/rhythm" element={<Rhythm />} />
            <Route path="/line-connection" element={<LineConnection />} />
            {/* [WHY]:動作確認用に追加 */}
            <Route path="/mini-game" element={<MiniGame />} />
            <Route path="/wherefrom" element={<WhereFrom />} />
            <Route path="/twister-24-training" element={<Twister />} />
            <Route path="/whack-a-mole" element={<WhackMole />} />
            <Route path="/card" element={<Card />} />
            <Route path="/waiting" element={<Waiting />} />
            <Route path="*" element={<ErrorPage statusCode={404} />} />
          </Routes>
        </div>
      </TimerContext.Provider>
    </BrowserRouter>
  )
}

export default App
