import React from 'react'
import{Link} from "react-router-dom"
import {Container, Flex, 
        Text, HStack, 
        IconButton, Button,
        useColorMode } from "@chakra-ui/react";
import { AddIcon, PlusSquareIcon, 
         SunIcon, MoonIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode() 

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex 
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column", 
          sm:"row"
        }}
      >
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          textAlign="center"
          textTransfrom="uppercase"
          fontSize={{base:"22", sm:"28"}}
          fontWeight='extrabold'
        >
          Product Store 
        </Text>
        <HStack>
          <Link to={"/create"}>
            {/* <IconButton icon={<AddIcon/>}></IconButton> */}
            <Button>
              <PlusSquareIcon fontSize={20 }/>
            </Button>
          </Link>
          <Link>
            <Button onClick={toggleColorMode}>
              {colorMode==="light"?<SunIcon/>:<MoonIcon/>}
              
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
