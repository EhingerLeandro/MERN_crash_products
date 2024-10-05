import {useState} from "react";
import {Box, Image, Heading, Text,  VStack,
        HStack, IconButton, useToast,
        useColorModeValue, Modal,Input, 
        useDisclosure, ModalOverlay,
        ModalHeader,ModalCloseButton,
        ModalContent, ModalBody, 
        ModalFooter, Button} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import Unavailable from "../assets/no_disponible.jpg";
import {useProductStore} from "../store/product.js";

const ProductCard = ({product})=>{
    const textColor =  useColorModeValue("gray.600", "gray.200")
    const boxBg = useColorModeValue("gray.200", "gray.800");
    const {deleteProduct, updateProduct} = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const [updatedProduct, setUpdatedProduct] = useState(product)
    
    console.log("UpdatedProduct --> ", updatedProduct)
    async function buttonDelete (paramId) {
        console.log("Id --> ", paramId);
        const {success, message} = await deleteProduct(paramId);
        console.log("success-->",success, " message-->" , message); 
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
                title: 'Success Message',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const handleUpdate = async(paramId, updatedProduct)=>{
       await updateProduct(paramId, updatedProduct)
    }

    return(
        <Box shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{transform: "translateY(-5px)",shadow:"xl"}}
        bg={boxBg}>
            <Image src={product.image}  alt={product.name}
            h={48} w="full" objectFit="cover"
            onError={(e)=>e.target.src=Unavailable}/>
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight="bold"
                fontSize="xl"  mb={4}
                color={textColor}
                >
                    {product.price}
                </Text>
                <HStack>
                    <IconButton icon={<EditIcon/>} onClick ={onOpen} colorScheme="blue" />
                    <IconButton icon={<DeleteIcon/>} colorScheme="red" 
                    onClick={()=>buttonDelete(product._id)} />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder="Product Name"
                                name="name" 
                                value={updatedProduct.name}
                                onChange={(e)=>setUpdatedProduct({...updatedProduct, name: e.target.value})}
                            />
                            <Input placeholder="Price"
                                name="price" 
                                value={updatedProduct.price}
                                type="number"
                                onChange={(e)=>setUpdatedProduct({...updatedProduct, number: e.target.value})}
                            />
                            <Input placeholder="Image Link"
                                name="image" 
                                value={updatedProduct.image}
                                onChange={(e)=>setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />                                                    
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" m="1" 
                        onClick={()=>handleUpdate(updatedProduct._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button variant="ghost" m="1" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard;