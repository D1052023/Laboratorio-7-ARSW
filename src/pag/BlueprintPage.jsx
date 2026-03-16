import { useEffect, useRef, useState } from 'react'
import { createStompClient, subscribeBlueprint } from '../lib/stompClient'
import { drawPayloadSchema } from "../lib/drawPayload"
import api from "../lib/apiClient"

const STOMP_BASE = import.meta.env.VITE_STOMP_BASE ?? 'http://localhost:8080'

export default function BlueprintPage() {

  const [tech, setTech] = useState('stomp')
  const [author, setAuthor] = useState('robinson')
  const [name, setName] = useState('estrella')

  const canvasRef = useRef(null)

  const stompRef = useRef(null)
  const unsubRef = useRef(null)

  useEffect(() => {

    api.get(`/blueprints/${author}/${name}`)
      .then(res => drawAll(res.data.data))

  }, [author, name])

  function drawAll(bp) {

    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, 600, 400)

    ctx.beginPath()

    bp.points.forEach((p, i) => {

      if (i === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)

    })

    ctx.strokeStyle = "#00eaff"
    ctx.lineWidth = 2
    ctx.stroke()

  }

  useEffect(() => {

    unsubRef.current?.()
    stompRef.current?.deactivate?.()

    if (tech === 'stomp') {

      const client = createStompClient(STOMP_BASE)

      stompRef.current = client

      client.onConnect = () => {

        unsubRef.current = subscribeBlueprint(client, author, name, (upd) => {

          drawAll({ points: upd.points })

        })

      }

      client.activate()

    }

  }, [tech, author, name])

  function onClick(e) {

    const rect = e.target.getBoundingClientRect()

    const payload = {
      author,
      name,
      point: {
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top)
      }
    }

    const result = drawPayloadSchema.safeParse(payload)

    if (!result.success) {
      console.error("Payload inválido", result.error)
      return
    }

    if (stompRef.current?.connected) {

      stompRef.current.publish({
        destination: '/app/draw',
        body: JSON.stringify(payload)
      })

    }

  }

  return (

    <div className="container">

      <header>

        <h1>ETI – Laboratorio de Blueprints en React</h1>

        <nav>
          <a href="/login">Login</a>
        </nav>

      </header>

      <h2>BluePrints RT – Socket.IO vs STOMP</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>

        <select
          className="input"
          value={tech}
          onChange={e => setTech(e.target.value)}
        >
          <option value="stomp">STOMP (Spring)</option>
          <option value="socketio">Socket.IO</option>
        </select>

        <input
          className="input"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />

        <input
          className="input"
          value={name}
          onChange={e => setName(e.target.value)}
        />

      </div>

      <div className="card">

        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onClick={onClick}
        />

      </div>

    </div>

  )

}