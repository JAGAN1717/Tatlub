import React, { useState } from "react";
import SettingContext from "./SettingContext";
import  config  from "../../components/customizer/config.json";
import { useEffect } from "react";
const SettingProvider = (props) => {

  if(typeof window === 'undefined'){
    return null
  }
 

  sessionStorage.getItem('slectLang')

  const [layoutState, setLayoutState] = useState(localStorage.getItem('slectLang'));
  const [layoutColor, setLayoutColor] = useState("#ff4c3b");




  // const layoutFun = (item) => {
  //   if (item === "RTL") {
  //     document.body.classList.remove("ltr");
  //     document.body.classList.add("rtl");
  //     setLayoutState("LTR");
  //   } else {
  //     document.body.classList.remove("rtl");
  //     document.body.classList.add("ltr");
  //     setLayoutState("RTL");
  //   }
  // };

  const layoutFun = (item) => {
    if (item === "ar") {
      document.body.classList.remove("ltr");
      document.body.classList.add("rtl");
      setLayoutState("en");
    } else {
      document.body.classList.remove("rtl");
      document.body.classList.add("ltr");
      setLayoutState("ar");
    }
  };

  useEffect(()=>{
    layoutFun(layoutState);
  },[])


  const layoutColorFun = (item) => {
    document.documentElement.style.setProperty(
      "--theme-deafult",
      item.target.value
    );
    config.color = item.target.value;
    setLayoutColor(item.target.value);
  };

  return (
    <SettingContext.Provider
      value={{
        ...props,
        state: layoutState,
        layoutFun: layoutFun,
        layoutColorFun: layoutColorFun,
      }}
    >
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
