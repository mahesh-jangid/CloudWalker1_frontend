import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { MultiSelect, useMultiSelect } from "chakra-multiselect";
// import R_Select from "react-select";
import { Button, Select, Spinner } from "@chakra-ui/react";
import { AdduserData } from "../Redux/actions/userActions";
const StateData = [
  {
    name: "Maharashtra",
    cities: ["Mumbai", "Pune"],
    Postal_code: [432123, 437467, 414363, 341503],
  },
  {
    name: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Ajmer", "Udaipur"],
    Postal_code: [332435, 487523],
  },
  {
    name: "Assam",
    cities: ["Guwahati", "Silchar", "Dibrugarh", "Nagaon"],
    Postal_code: [653432, 756363, 498346],
  },
];
const AddData = () => {
  const [{ state, city, Postal_code }, setData] = useState({
    state: "Maharashtra",
    city: "",
    Postal_code: "",
  });
  console.log(city);
  const states = StateData.map((state) => (
    <option key={state.name} value={state.name}>
      {state.name}
    </option>
  ));

  const cities = StateData.find((item) => item.name === state)?.cities.map(
    (city) => (
      <option key={city} value={city}>
        {city}
      </option>
    )
  );
  const postal = StateData.find((item) => item.name === state)?.Postal_code.map(
    (postal) => (
      <option key={postal} value={postal}>
        {postal}
      </option>
    )
  );
  function handleCountryChange(event) {
    setData((data) => ({ ...data, state: event.target.value }));
  }

  function handleStateChange(event) {
    setData((data) => ({ ...data, city: event.target.value }));
  }
  function handlePostalChange(event) {
    setData((data) => ({ ...data, Postal_code: event.target.value }));
  }
  // ////////////////////////////
  const dispatch = useDispatch();
  //   const userInfo = localStorage.getItem("userInfo");
  const { value, options, onChange } = useMultiSelect({
    value: ["shoes", "Shirt", "Jeans", "Boots"],
    options: ["shoes", "Shirt", "Jeans", "Boots"],
  });
  console.log(value);
  const {
    value: hobbiesValue,
    options: hobbiesoptions,
    onChange: onChange2,
  } = useMultiSelect({
    value: ["Coding", "Debugging", "Playing Games", "Music"],
    options: ["Coding", "Debugging", "Playing Games", "Music"],
  });
  const [fullname, setfullname] = useState("");
  const [mother_name, setmother_name] = useState("");
  const [user_description, setuser_description] = useState("");
  // const [city, setcity] = useState("");
  // const [state, setstate] = useState("");
  // const [Postal_code, setPostal_code] = useState("");
  const [products, setproducts] = useState("");
  const [hobbies, sethobbies] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const addData = useSelector((state) => state.addData);
  const { loading, error, success } = addData;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      AdduserData({
        fullname,
        mother_name,
        user_description,
        state: [state],
        city: [city],
        Postal_code: [Postal_code],
        products: value,
        hobbies: hobbiesValue,
      })
    );
  };
  return (
    <>
      <div className="Edituser">
        {" "}
        <div className="formedit ">
          <form onSubmit={submitHandler}>
            {success && <h4>Data successfully Added</h4>}
            {error && <h4>Error Occured</h4>}
            <div>
              <div className="input-div zz">
                <div className="div">
                  <InputGroup>
                    <Input
                      type="text"
                      value={fullname}
                      placeholder="Enter full name"
                      onChange={(e) => setfullname(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="input-div one">
                <div className="div">
                  <InputGroup>
                    <Input
                      type="text"
                      value={mother_name}
                      placeholder="Enter mother name"
                      onChange={(e) => setmother_name(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="input-div one">
                <div className="div">
                  <InputGroup>
                    <Input
                      type="text"
                      value={user_description}
                      placeholder="Enter user description"
                      onChange={(e) => setuser_description(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div>
              {/* <div className="input-div one">
                <div className="div">
                  <InputGroup>
                    <Input
                      type="text"
                      value={city}
                      placeholder="Enter city"
                      onChange={(e) => setcity(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div> */}
              {/* <div className="input-div one">
                <div className="div">
                  <InputGroup>
                    <Input
                      type="text"
                      value={state}
                      placeholder="Enter state"
                      onChange={(e) => setstate(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div> */}
              {/* <div className="input-div one">
                <div className="div">
                  <InputGroup>
                    <Input
                      type="text"
                      value={Postal_code}
                      placeholder="Enter Postal Code"
                      onChange={(e) => setPostal_code(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </div> */}

              {/* <div className="dropdown-container">
                <R_Select
                  options={optionList}
                  placeholder="Select color"
                  value={selectedOptions}
                  onChange={handleSelect}
                  isSearchable={true}
                  isMulti
                />
              </div> */}
              <MultiSelect
                options={options}
                value={value}
                label="Choose Product or add new Product"
                onChange={onChange}
                create
              />
              <MultiSelect
                options={hobbiesoptions}
                value={hobbiesValue}
                label="Choose habbits or add new habbit"
                onChange={onChange2}
                create
              />

              <div className="input-div one">
                <Select value={state} onChange={handleCountryChange}>
                  {states}
                </Select>
              </div>

              <div className="input-div one">
                <Select value={city} onChange={handleStateChange}>
                  {cities}
                </Select>
              </div>
              <div className="input-div one">
                <Select value={Postal_code} onChange={handlePostalChange}>
                  {postal}
                </Select>
              </div>
              {/* <input type="submit" className="btna2" value="Add Data" /> */}
              <Button type="submit" colorScheme="pink" size="lg" fontSize="md">
                {loading ? <Spinner color="white.500" /> : "Add Data"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddData;
