import BasicExampleScene from './BasicExample/BasicExample'
import './App.css'
import R3FLessonsApp from './MyTutorialLesson/R3FLessonsApp'
import AdvancedExample from './AdvancedExample/AdvancedExample'
import YoutubeExample from './YouTubeExample/YouTubeExample'
import { Navigate, Outlet, Route, Routes } from 'react-router'
import { BrowserRouter, Link } from 'react-router-dom'

const App = () => {
    return (
        <div className="App">
            <div className="main">
                <BrowserRouter>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto',
                        }}
                    >
                        <Link to="BasicExample">BasicExample</Link>
                        <Link to="R3FLessonsApp">R3FLessonsApp</Link>
                        {/* <Link to="AdvancedExample">AdvancedExample</Link> */}
                        <Link to="YoutubeExample">YoutubeExample</Link>
                    </div>
                    <Outlet />

                    <Routes>
                        <Route
                            path="AdvancedExample"
                            element={<AdvancedExample />}
                        />
                        <Route
                            path="BasicExample"
                            element={<BasicExampleScene />}
                        />
                        <Route
                            path="R3FLessonsApp"
                            element={<R3FLessonsApp />}
                        />
                        <Route index element={<YoutubeExample />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default App
