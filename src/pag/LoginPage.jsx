import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/apiClient'

export default function LoginPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)

    try {

      const { data } = await api.post('/auth/login', { username, password })

      localStorage.setItem('token', data.access_token)

      alert('Login exitoso')

      navigate('/blueprints')

    } catch (e) {

      setError('Credenciales inválidas o servidor no disponible')

    }
  }

  return (

    <div className="container">

      <header>
        <h1>ETI – Laboratorio de Blueprints en React</h1>
      </header>

      <div className="card">

        <h2 style={{ marginTop: 0 }}>Login</h2>

        <form onSubmit={submit}>

          <div className="grid cols-2">

            <div>
              <label>Usuario</label>
              <input
                className="form-control input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>

          {error && <p style={{ color: '#f87171' }}>{error}</p>}

          <button className="btn" style={{ marginTop: 12, width: "100%" }}>
            Ingresar
          </button>

        </form>

      </div>

    </div>

  )

}