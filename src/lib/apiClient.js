import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api"
})

api.interceptors.request.use(config => {

  const token = localStorage.getItem("token")

  // no enviar token al login
  if (token && !config.url.includes("/auth/login")) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {

    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token")
    }

    return Promise.reject(err)
  }
)

export default api