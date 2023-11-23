import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from 'react-select';
import { useTranslation } from "react-i18next";


const Addons = ({ addonlist, addontId, selectplans, setAddondsId, postSubscription, categoryList, selectedCategory, setSelectedCategory }) => {
    
    const { t } = useTranslation();


    const MenuProps = {
        // PaperProps: {
        //   style: {
        //     maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //     width: 250,
        //   },
        // },
    };


    

    const handleChange = (event) => {
        setSelectedCategory(event.map((p)=>p?.id))
      };

    const handleCheckboxChange = (event) => {
        const id = addontId.find((num) => num === event)
        //    setAddondsId((pram)=>[...pram,event])
        id ? setAddondsId(addontId.filter((num) => num !== id)) : setAddondsId((pram) => [...pram, event])
    };



    const selectedCategoryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center w-100">
                    <div className="w-100"><h4 className="text-capitalize">{option.category_name}</h4></div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };


    const CategoryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center w-100">
                <div><h4>{option.category_name}</h4></div>
            </div>
        );
    };


    return (<>
        <section className="mb-5 mt-5 pt-5">
            <div className="container d-flex justify-content-center align-tems-center mb-4">
                <div className="subscription_card position-relative">
                    <div className="plan_card position-absolute  top-0 start-50 translate-middle d-flex justify-content-center align-items-center mb-4">
                        <div className="text-center">
                            <h3 className="text-light mt-2">{selectplans?.plan_name}</h3>
                            <h1 className="text-light fs-30 mb-0">{t("QAR")} {selectplans?.plan_price}</h1>
                        </div>
                    </div>


                    <div className="addon_head mb-4 p-2 ">
                        <h4 className="text-dark fw-bold mb-0">{t("Select Your Feature")}</h4>
                    </div>
                    {/* <div className="card d-flex justify-content-center d-none mb-3">
                        <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={categoryList}   optionLabel="name"   placeholder="Select a Category" filter valueTemplate={selectedCategoryTemplate} itemTemplate={CategoryOptionTemplate} className="w-100" />
                        <Autocomplete
                            value={selectedCategory}
                            onChange={(event, newValue) => {
                                setSelectedCategory(newValue);
                            }}
                        id="combo-box-demo"
                        options={categoryList}
                        // sx={{ width: }} 
                        getOptionLabel={(option) => option.category_name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              {option.category_name}
                            </Box>
                          )}
                        renderInput={(params) => <TextField {...params}  label="Select a Category" />}
                        />

                        <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                className="w-100"
                                value={selectedCategory}
                                onChange={(event, newValue) => {
                                    setSelectedCategory(newValue);
                                }}

                            >
                                {categoryList.map((name,index) => (
                                    <MenuItem
                                        key={index}
                                        value={name.id}
                                    >
                                        {name.category_name}
                                    </MenuItem>
                                ))}
                                
                            </Select>
                        </FormControl>
                    </div> */}

                    <div className='mb-3 d-flex justify-content-center'>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            name="category_name"
                            placeholder={t('Select Category')}
                            onChange={handleChange}
                            options={categoryList}
                            getOptionLabel={(option) => `${option.category_name}`}
                            getOptionValue={(option) => option.id}
                            className="fs-16 w-100 mb-3 text-capitalize"
                            classNamePrefix="select"
                        />
                    </div>

                    <div className="AddonList_co  list-group  list-group-flush px-3">
                        {addonlist?.length > 0 ?
                            addonlist?.map((data, index) => {
                                // const pricef = data?.subscription_addons_price?.filter(res => res?.category_id == selectedCategory?.id)
                                return (
                                    <div className="d-flex addont_h list-group-item justify-content-between align-tems-center mb-3 cursor-pointer" key={index} onClick={()=> document.getElementById(`flexCheckDefault${index}`)?.click()}>
                                        <div className="">
                                            <h4 className={`text-capitalize fw-600 fs-16`}>{index + 1}{') '}{data?.name}</h4>
                                           {selectedCategory?.length > 0 ? <h3 className='fs-16'>{t("QAR")} {parseInt(data?.price ?? 0)}</h3> : <h3></h3> } 
                                        </div>
                                        {/* <div className="" >
                                    <i className={`fa fa-check fs-5 fst-italic cursor-pointer ${addontId[index] == data?.id? 'text-color':'text-secondary' }`} aria-hidden="true"></i></div> */}
                                        <div class="form-check" onClick={() => {
                                            // const id = addontId.find((num) => num === data?.id);
                                            // id ? setAddondsId(addontId.filter((num) => num !== id)) :
                                            // setAddondsId((pram)=>[...pram,data?.id])
                                        }}>
                                            <input class="form-check-input  fs-20"  type="checkbox" checked={addontId.find((num) => num === data?.id)} onChange={() => handleCheckboxChange(data?.id)} value="" id={`flexCheckDefault${index}`} />
                                        </div>
                                    </div>
                                )
                            }) :

                            <div className="d-flex flex-column justify-content-center align-items-center ">
                                <img
                                    src="/assets/images/tatlub-img/not_Found.png"
                                    //   className="no_image "
                                    className="w-50"
                                />
                                <h3 className="text-center text-uppercase">{t("NO ADDONS FOUND")}</h3>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="container text-center">
                <button type="button" onClick={() => postSubscription()} disabled={!selectedCategory?.length > 0 || !addontId?.length > 0} className="btn btn_filter1 px-sm-4 px-2 w-25  mb-sm-0 mb-3">{t("CONTINUE")}</button>
            </div>
        </section>
    </>)
}

export default Addons