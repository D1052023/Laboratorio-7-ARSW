import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pag/LoginPage"
import PrivateRoute from "./routes/PrivateRoute"
import BlueprintPage from "./pag/BlueprintPage"

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* abrir login por defecto */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/blueprints"
          element={
            <PrivateRoute>
              <BlueprintPage />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )
}