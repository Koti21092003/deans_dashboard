import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../Dashboard/Navbar'
import Footer from '../Dashboard/Footer'
import Sidebar from '../Dashboard/Sidebar'

const FirstPage = () => {
  return (
    <ChakraProvider>
      <Navbar />
      <Sidebar/>
      <div style={{ textAlign: 'center', marginBottom : '10px',margin: '30px 0', padding : '10px', fontSize: '30px', fontWeight: 'bold' }}>
        <h1 style={{marginBottom : '10px'}}>Welcome to Dashboard</h1>
        <img src="https://cutmap.ac.in/wp-content/uploads/MRC_5662-copy1.jpg" alt="Centurion" style={{ width: '100%', height: 'auto' }} />
      </div>
      <Footer />
    </ChakraProvider>
  )
}

export default FirstPage