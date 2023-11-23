import { createContext } from 'react';

const authValue = {
    userData : undefined,
    setUserData: () => {},
}

const Usercontex = createContext(authValue);

export default Usercontex;