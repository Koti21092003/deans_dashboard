import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Navbar from "./Navbar";
import { ChakraProvider, Box, } from "@chakra-ui/react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

Chart.register(CategoryScale);

const Main = () => {

  const buttonStyle = {
    margin: "0 10px",
    padding: "10px 20px",
    backgroundColor: "#3182ce",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <ChakraProvider>
      <Navbar />
      <Sidebar/>
      <Box textAlign="center" my={4}>
       <Link to={'/subjectwise'}> <button style={buttonStyle} >Subjectwise</button> </Link>
       <Link to={'/overall'}><button style={buttonStyle}>Overall Attendance</button></Link>
      </Box>
      
      <Footer />
    </ChakraProvider>
  );
};

export default Main;