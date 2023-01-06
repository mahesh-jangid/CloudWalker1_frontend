import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { Link, NavLink, useHistory } from "react-router-dom";

import { IoLogOutOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";

import { logout } from "../Redux/actions/userActions";

import {
  Button,
  Container,
  Heading,
  Spacer,
  Box,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";

export const Nav = () => {
  const history = useHistory();
  const [signin, setSignin] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };
  return (
    <>
      <Container
        maxW="8xl"
        width={"100%"}
        bg={"gray.900"}
        p={4}
        position="sticky"
        top="0"
        zIndex="sticky"
      >
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Link to={"/"}>
            <Box p="2">
              <Heading color={"white"} size="md">
                App
              </Heading>
            </Box>
          </Link>
          <Spacer />
          <Link to={"/Home"}>
            <Text color={"white"}>Dashboard</Text>
          </Link>

          <Spacer />
          <Flex gap="6" fontSize={"18px"}>
            {userInfo ? (
              <div className="ic_sett_dis">
                <Button onClick={logoutHandler} colorScheme="pink">
                  {" "}
                  LogOut
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  colorScheme="pink"
                  className="signin"
                  onMouseOver={() => setSignin(!signin)}
                  onMouseOut={() => setSignin(!signin)}
                >
                  Sign in
                  {!signin ? (
                    <BsArrowRightShort size="25" />
                  ) : (
                    <MdKeyboardArrowRight size="25" />
                  )}
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
