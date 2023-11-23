import { createContext } from 'react';

const intialValue = {
    categoryId :undefined,
    setCategoryId: () => {},
    BrandId : undefined,
    setBrandId: () => {},
    MyId : undefined,
    setMyId: () => {},
    ItemsId : undefined,
    setItemsId: () => {},
    productId : undefined,
    setproductId: () => {},
    searchKey : undefined,
    setSearchKey : () => {},
    cart : [],
    setCart : () => [],
}

const itemscontex = createContext(intialValue);

export default itemscontex;