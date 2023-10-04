import Header from "./HeaderComponent"
import ImageRecognition from "./ImageRecognitionComponent"
import Divider from "./DividerComponent"
import "../css/App.css"

export default function App() {

    return(
        <div className="app">
            <Header text="Nuotraukos objektų atpažinimo įrankis"></Header>
            <Divider/>
            <ImageRecognition></ImageRecognition>
        </div>
    )
}