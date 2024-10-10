// import React from 'react';
import {useState} from "react";
import {Container, Heading, 
  Box, useColorModeValue,
  VStack, Input, Button, useToast} from "@chakra-ui/react";
import {useProductStore} from "../store/product";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:""
  })
  
  const toast = useToast();
  const {createProducts} = useProductStore(); 
  let navigate = useNavigate()

  async function handleButton(){
    const {success, message} = await createProducts(newProduct);

    if(!success){
      toast({
        title: 'Error.',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }else{
      toast({
        title: 'Success.',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
    console.log("success -> ", success);
    console.log("message -> ", message);
    navigate("/");
  }

  return (
    <Container maxW={"container.sm"}>
      <Heading as={"h1"} 
      textAlign={"center"} mt={8} mb={2} p={2}>
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
