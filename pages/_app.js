import React, { useEffect, useState } from "react";
import ThemeSettings from "../components/customizer/theme-settings";
import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
// import MessengerCustomerChat from "react-messenger-customer-chat";
import CartContextProvider from "../helpers/cart/CartContext";
import { WishlistContextProvider } from "../helpers/wishlist/WishlistContext";
import FilterProvider from "../helpers/filter/FilterProvider";
import SettingProvider from "../helpers/theme-setting/SettingProvider";
import { CompareContextProvider } from "../helpers/Compare/CompareContext";
import { CurrencyContextProvider } from "../helpers/Currency/CurrencyContext";
import Helmet from "react-helmet";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from '../helpers/apollo';
import { createContext } from "react";
// import {initialProvider} from './initialvalueContex'
import itemscontex from "./initcontext";
import Usercontex from "../components/auth/AuthContex";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useRouter } from 'next/router';
import { IdProvider } from "../IdContext";
// import { persistStore } from 'redux-persist'
// import { Provider } from 'react-redux'
// import { Store } from "../redux/store";
import CommonLayout from "../components/shop/common-layout";
import { CategoryProvider } from "../components/auth/catgoryContext";

// https://tatlub.vrikshatech.in/api/?slug=travel_and_tourism


export default function MyApp({ Component, pageProps }) {

  const router = useRouter();

  if (typeof window === 'undefined') {
    return null
  }

  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState();
  const apolloClient = useApollo(pageProps);
  const [categoryId, setCategoryId] = useState('')
  const [BrandId, setBrandId] = useState()
  const [MyId, setMyId] = useState()
  const [ItemsId, setItemsId] = useState()
  const [productId, setproductId] = useState()
  const [searchKey, setSearchKey] = useState()
  const [cart, setCart] = useState([])
  const [id, setId] = useState(null);

  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('data')));
  // const [data,setData] = useState(JSON.parse(localStorage.getItem('data')) ?? '')

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('data')) ?? '')
  }, [localStorage.getItem('data')])


  // useEffect(() => {
  //   const path = window.location.pathname.split("/");
  //   const url = path[path.length - 1];
  //   document.body.classList.add("dark");

  //   let timer=setTimeout(function () {
  //     setIsLoading(false)
  //   },2000);
  //   return () => { clearTimeout(timer)}
  // }, []);

  // let persistor = persistStore(Store)

  return (
    <>
      {/* <Provider store={Store} > */}
      <ApolloProvider client={apolloClient}>
        {isLoading ? (
          <div className="loader-wrapper">
            {url === "Christmas" ? (
              <div id="preloader"></div>
            ) : (
              <div className="loader"></div>
            )}
          </div>
        ) : (
          <>
            {/* <MessengerCustomerChat
            pageId="2123438804574660"
            appId="406252930752412"
            htmlRef="https://connect.facebook.net/en_US/sdk.js"
          /> */}
            <Helmet>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              {/* <Head>
              <link rel="icon" type="image/x-icon" href={favicon} />
            </Head> */}
              <title>Tatlub.com</title>
            </Helmet>
            <div>
              {/* <QueryClientProvider client={queryClient}> */}
              <IdProvider>
                <Usercontex.Provider value={{ userData, setUserData }}>
                  {/* <Provider store={Store}> */}
                  <CategoryProvider>
                  <SettingProvider>
                    <itemscontex.Provider value={{ categoryId, setCategoryId, BrandId, setBrandId, MyId, setMyId, ItemsId, setItemsId, productId, setproductId, searchKey, setSearchKey, cart, setCart }} >
                      <CompareContextProvider>
                        <CurrencyContextProvider>
                          <CartContextProvider>
                            <WishlistContextProvider>
                              <FilterProvider>
                                <CommonLayout >
                                  <Component {...pageProps} />
                                </CommonLayout>
                              </FilterProvider>
                            </WishlistContextProvider>
                          </CartContextProvider>
                        </CurrencyContextProvider>
                        <ThemeSettings />
                      </CompareContextProvider>
                    </itemscontex.Provider>
                  </SettingProvider>
                  </CategoryProvider>
                  {/* </Provider> */}
                </Usercontex.Provider>
              </IdProvider>
              {/* </QueryClientProvider> */}
              <ToastContainer />
              <TapTop />
            </div>
          </>
        )}
      </ApolloProvider>
      {/* </Provider> */}
    </>
  );
}
