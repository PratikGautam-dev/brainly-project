import { Signin } from "./pages/signin"
import { Signup } from "./pages/signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { FilterProvider } from "./context/FilterContext"
import { ShareView } from "./pages/share-view"

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:hash" element={<ShareView />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  )
}

export default App
