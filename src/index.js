import { LostPaws } from "./components/LostPaws"
import { UploadWidget } from "./components/UploadWidget"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <LostPaws />
        <UploadWidget />
    </BrowserRouter>
)

