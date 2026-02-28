import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/styles.css"
import ImportPage from "./pages/ImportPage"
import DependenciesPage from "./pages/DependenciesPage"
import ResultPage from "./pages/ResultPage"

export default function App() {
    return (
        <BrowserRouter>
            <div className="container"></div>
            <Routes>

                <Route path="/" element={<ImportPage />} />

                <Route path="/dependencies" element={<DependenciesPage />} />

                <Route path="/result" element={<ResultPage />} />

            </Routes>
        </BrowserRouter>
    )
}