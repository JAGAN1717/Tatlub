import React,{createContext,useContext,useState} from 'react'

const intialValue = {
    CategoryId :undefined,
    setCategoryId: () => {},
    BrandId : undefined,
    setBrandId: () => {},
    MyId : undefined,
    setMyId: () => {},
    ItemsId : undefined,
    setItemsId: () => {},
    productId : undefined,
    setproductId: () => {},
}
const IdContex = createContext(intialValue)

const useIdContex = () => {
    return useContext(IdContex)
  }

 const initialProvider = ({children}) => {
    const [CategoryId,setCategoryId] = useState('jgfjgf')
    const [BrandId,setBrandId] = useState()
    const [MyId,setMyId] = useState()
    const [ItemsId,setItemsId] = useState()
    const [productId,setproductId] = useState()


  return (
    <IdContex.Provider value={{CategoryId, setCategoryId, BrandId, setBrandId, MyId, setMyId, ItemsId, setItemsId, productId, setproductId}} >
        {children}
    </IdContex.Provider>
  )
}




  export {initialProvider, useIdContex}
