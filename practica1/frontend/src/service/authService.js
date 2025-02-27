export function AuthService(){
  const API = 'http://localhost:3000/api/auth'
  const login = async (email, password) => {
    try{
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      if (!response.ok){
        throw new Error('Error en inicio de sesión')
      }
      const data = await response.json()
      return data
    }catch(error){
      console.error('ERROR: ', error)
    }
  }
  
  const register = async (name, lastname, username, email, password, role ) => {
    try{
      const response = await fetch(`${API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": name,
          "lastname": lastname,
          "username": username,
          "email": email,
          "password": password,
          "role": role.toUpperCase()
        })
      })
      if (!response.ok){
        throw new Error('Error al crear usuario')
      }
      const data = await response.json()
      return data
    }catch(error){
      console.error('ERROR: ', error)
    }
  }

  const getUser = async (id, token) => {
    try{
      const response = await fetch(`${API}/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok){
        throw new Error('Error al obtener usuario')
      }
      const data = await response.json()
      return data
    }
    catch(error){
      console.error('ERROR: ', error)
    }
  }

  const checkStatus = async (token) => {
    try{
      const response = await fetch(`${API}/check-status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok){
        throw new Error('Error al obtener usuario')
      }
      const data = await response.json()
      return data
    }
    catch(error){
      console.error('ERROR: ', error)
    }
  }
  return { login, register, getUser, checkStatus }
}