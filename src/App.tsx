import Header from "./components/HeaderComponent"
import ImageRecognition from "./components/ImageRecognitionComponent"
import Divider from "./components/DividerComponent"

export default function App() {

    return(
        <>
            <Header text="Nuotraukos objektų atpažinimo įrankis"></Header>
            <Divider/>
            <ImageRecognition></ImageRecognition>
        </>
    )
}