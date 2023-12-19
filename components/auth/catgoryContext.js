import { createContext,useContext, useState } from 'react';

const CategoriesValue = {
    CategoryList : undefined,
    setCategoryList: () => {},
}

const Categorycontext = createContext(CategoriesValue); 


const useCategory = () => {
    return useContext(Categorycontext)
}

const CategoryProvider = ({children}) => {

    const [CategoryList,setCategoryList] = useState([])

    return(
        <Categorycontext.Provider value={{CategoryList,setCategoryList}}>
            {children}
        </Categorycontext.Provider>
    )

}


export {CategoryProvider,useCategory};