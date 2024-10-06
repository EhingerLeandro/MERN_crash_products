import {create} from "zustand";

export const useProductStore = create((set)=>({
    products:[],
    setProducts:(products) => set({products}),
    /*Inside the createProducts property an asynchronous function uses
    fetch sintax to create a request to the server using POST method*/ 
    createProducts: async(newProduct)=>{
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return { success:false, message:"Please fill in all fields!"}
        }
        const res = await fetch("/api/products", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });
        console.log(res)
        const data = await res.json();
        /*In the next line the data is stored in a global state
        to be used by all components.*/
        set((state)=>({products:[...state.products, data.data]}));
        return { success:true, message:"Product created successfully!"}
    },
    fetchProducts: async()=>{
        const res = await fetch("/api/products");
        const data = await res.json()
        console.log(data);
        set({products: data.data})
    },
    deleteProduct: async(prodId)=>{
        const res = await fetch(`/api/products/${prodId}`, {
            method:"DELETE",
        });
        console.log("products store res ->", res);
        const data = await res.json();
        console.log("products store data ->", data);
        //In the next line the validation avoids setting the state incorrectly
        if(!data.message) return {success: false, message:data.message};
        /*Setting the state after deleting a product allows to re-render the UI immediately
        without needing a reloading*/
        set((state)=>({products: state.products.filter(element=>element._id !== prodId)}))
        return {success: true, message: data.message}; 
    },
    updateProduct: async(prodId, updatedProduct)=>{
        const res = await fetch(`./api/products/${prodId}`, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(updatedProduct)
        })
        const data = await res.json();
        if(!data.success) return {succes:false, message: data.message};
        
        //Updates the UI immediately without needing a refresh
        set((state)=>({
            products: state.products.map((product)=> product._id == prodId? data.data: product)
        }));
        return {success:true, message:data.message}
    }
}))