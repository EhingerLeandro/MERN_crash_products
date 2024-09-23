import {Button, Box,
      useColorModeValue
      } from "@chakra-ui/react";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";


function App() {

  return (
    <div>
      <Box minH={"100vh"} bg={useColorModeValue("white", "gray.900")}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create" element={<CreatePage/>}/>
        </Routes>
      </Box>
    </div>
  )
}
export default App
