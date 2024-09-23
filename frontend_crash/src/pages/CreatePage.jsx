// import React from 'react';
import {useState} from "react";
import {Container, Heading, 
  Box, useColorModeValue,
  VStack, Input, Button} from "@chakra-ui/react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:""
  })

  function handleButton (){
    console.log(newProduct);
  }

  return (
    <Container maxW={"container.sm"}>
      <Heading as={"h1"} size={"2xl"} 
      textAlign={"center"} mb={8} p={2}>
        Create New Product!
      </Heading>
      <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
      p={6} rounded={"lg"} shadow={"md"}>
        <VStack >
          <Input placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={(e)=> setNewProduct({...newProduct, name: e.target.value})}
          />
          <Input placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={(e)=> setNewProduct({...newProduct, price: e.target.value})}
          />
          <Input placeholder="Image Link"
            name="image"
            value={newProduct.image}
            onChange={(e)=> setNewProduct({...newProduct, image: e.target.value})}
          />
          <Button colorScheme="blue"
          onClick={handleButton}
          w={"full"}
          >Add Product</Button>
        </VStack>
      </Box>
    </Container>
  )
} 

export default CreatePage
