import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pag/LoginPage"
import PrivateRoute from "./routes/PrivateRoute"
import BlueprintPage from "./pag/BlueprintPage"

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
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