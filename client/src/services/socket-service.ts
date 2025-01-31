import { io } from 'socket.io-client'
export const connectSocket = () => {
  const socket = io('http://localhost:3333')

  // client-side
  socket.on('connect', () => {
    console.log(socket.id) // x8WIv7-mJelg7on_ALbx
  })

  socket.on('disconnect', () => {
    console.log(socket.id) // undefined
  })
}
