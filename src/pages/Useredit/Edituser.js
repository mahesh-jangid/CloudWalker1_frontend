import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
// import { IoIosArrowDown } from "react-icons/io";
import RingLoader from "react-spinners/RingLoader";
import "./Edituser.css";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Checkbox } from "@chakra-ui/checkbox";

import { Helmet } from "react-helmet";
import { getUserDetails, updateUser } from "../../Redux/actions/userActions";
import { MultiSelect, useMultiSelect } from "chakra-multiselect";
import { Select, Spinner } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
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
const Edituser = ({ match, history }) => {
  const userId = match.params.id;
  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;
  console.log("USER", user);

  // ///
  const [fullname, setfullname] = useState("");
  const [mother_name, setmother_name] = useState("");
  const [user_description, setuser_description] = useState("");
  // const [city, setcity] = useState([]);
  // const [state, setstate] = useState([]);
  // const [Postal_code, setPostal_code] = useState([]);
  // console.log("state", state);
  const [{ state, city, Postal_code }, setData] = useState({
    state: "",
    city: "",
    Postal_code: "",
  });
  console.log("state", [state]);
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
  // function handleStateChange(e) {
  //   setstate(e.target.value);
  // }

  // function handleCityChange(e) {
  //   setcity(e.target.value);
  // }
  // function handlePostalChange(e) {
  //   setPostal_code(e.target.value);
  // }
  function handleStateChange(event) {
    setData((data) => ({ ...data, state: event.target.value }));
  }

  function handleCityChange(event) {
    setData((data) => ({ ...data, city: event.target.value }));
  }
  function handlePostalChange(event) {
    setData((data) => ({ ...data, Postal_code: event.target.value }));
  }
  // //////////////

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

  // const [products, setproducts] = useState("");
  // const [hobbies, sethobbies] = useState("");

  const dispatch = useDispatch();

  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setfullname(user.fullname);
      setmother_name(user.mother_name);
      setuser_description(user.user_description);
      // setstate(user.state);
      // setcity(user.city);
      // setPostal_code(user.Postal_code);
      setData((data) => ({
        ...data,
        state: user.state,
        city: user.city,
        Postal_code: user.Postal_code,
      }));
    }
    // }

    return () => {};
  }, [dispatch, userId, history, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        fullname,
        mother_name,
        user_description,
        state: state,
        city: city,
        Postal_code: Postal_code,
        products: value,
        hobbies: hobbiesValue,
      })
    );
  };

  const inputs = document.querySelectorAll(".inputa");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((inputa) => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });

  return (
    <div className="Edituser">
      <Helmet>
        <title>Edit data</title>
      </Helmet>
      {/* {error || (errorUpdate && <h4>{error || errorUpdate}</h4>)} */}

      {loading || loadingUpdate ? (
        <div className="loading">
          <Spinner color="white.500" />
        </div>
      ) : error ? (
        <h4>{error}</h4>
      ) : (
        <div>
          <h4 className="Edittitle">Edit data :</h4>

          <div className="formedit">
            <form onSubmit={submitHandler}>
              {successUpdate && <h4>Updated successfully</h4>}
              {error || (errorUpdate && <h4>{error || errorUpdate}</h4>)}
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
                      <InputRightElement children={<AiOutlineUser />} />
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
                <div className="input-div one">
                  <Select
                    value={city}
                    multiple={false}
                    onChange={handleCityChange}
                  >
                    {cities}
                  </Select>
                </div>
                <div className="input-div one">
                  <Select
                    value={state}
                    multiple={false}
                    onChange={handleStateChange}
                  >
                    {states}
                  </Select>
                </div>

                <div className="input-div one">
                  <Select
                    value={Postal_code}
                    multiple={false}
                    onChange={handlePostalChange}
                  >
                    {postal}
                  </Select>
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
                </div>
                <div className="input-div one">
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
                </div>
                <div className="input-div one">
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
                <MultiSelect
                  options={options}
                  value={value}
                  label="Choose or add new items"
                  onChange={onChange}
                  create
                />
                <MultiSelect
                  options={hobbiesoptions}
                  value={hobbiesValue}
                  label="Choose or add new items"
                  onChange={onChange2}
                  create
                />

                {/* <input type="submit" className="btna2" value="Update" /> */}
                <Button
                  type="submit"
                  colorScheme="pink"
                  size="lg"
                  fontSize="md"
                >
                  {loadingUpdate ? <Spinner color="white.500" /> : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edituser;
