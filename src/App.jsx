import BasicExampleScene from './BasicExample/BasicExample'
import './App.css'
import R3FLessonsApp from './MyTutorialLesson/R3FLessonsApp'
import AdvancedExample from './AdvancedExample/AdvancedExample'
import YoutubeExample from './YouTubeExample/YouTubeExample'

const App = () => {
    return (
        <div className="App">
            <div className="main">
                <YoutubeExample />
            </div>
        </div>
    )
}

export default App
