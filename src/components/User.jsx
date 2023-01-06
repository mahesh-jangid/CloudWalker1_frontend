import React, { useEffect } from "react";
import {
  Box,
  Container,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  Flex,
  Image,
  Spacer,
  Spinner,
  Select,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { AiFillDelete, AiOutlineEdit, AiOutlineFundView } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, ListUsers } from "../Redux/actions/userActions";
const User = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(user);

  const deletehandler = (id) => {
    if (window.confirm("Are You Sure to delete?")) {
      dispatch(DeleteUser(id));
    }
    window.location.href = "/Home";
  };
  return (
    <>
      <Box p={[2, 4, 6, 3]} borderBottom={"1px solid #b5bab5"}>
        <Flex justifyContent={"space-between"}>
          <HStack align={"top"}>
            <VStack align={"start"}>
              <Text fontWeight={600}>{user?.fullname}</Text>
              <Text color={"gray.600"} display={{ base: "none", md: "flex" }}>
                {user?.mother_name}
              </Text>
              <Text>State- {user.state}</Text>
              <Text>City- {user.city}</Text>
              <Text>Products Name</Text>

              <Flex>
                {user?.products?.map((p) => {
                  return (
                    <Box p={4} border={"1px solid #b5bab5"}>
                      {p}{" "}
                    </Box>
                  );
                })}
              </Flex>
              <Text>Hobbies</Text>
              <Flex>
                {user?.hobbies?.map((p) => {
                  return (
                    <Box p={4} border={"1px solid #b5bab5"}>
                      {p}{" "}
                    </Box>
                  );
                })}
              </Flex>
            </VStack>
          </HStack>
          <Spacer />
          <Flex alignItems={"center"}>
            <Stack>
              <Link to={`/${user._id}/update`}>
                <Button
                  leftIcon={<AiOutlineEdit size="16" />}
                  colorScheme="blue"
                  size="xs"
                >
                  EDIT
                </Button>
              </Link>
              <Button
                colorScheme="red"
                leftIcon={<AiFillDelete size="16" />}
                size="xs"
                onClick={() => {
                  deletehandler(user._id);
                }}
              >
                DELETE
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default User;
