import { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Container, SimpleGrid, Spinner } from "@chakra-ui/react";

import User from "../components/User";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListUsers } from "../Redux/actions/userActions";

function Home({ history }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [city, setcity] = useState([]);

  useEffect(() => {
    if (userInfo) {
      dispatch(ListUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      {/* <Select placeholder="Select option">
        {city.map((city) => {
          return <option value={city}>{city}</option>;
        })}
      </Select> */}

      <Link to="/adddata">
        <Button colorScheme="pink"> Add Data</Button>
      </Link>
      {loading ? (
        <div className="loading">
          <Spinner color="white.500" />
        </div>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <Flex direction={"column"} minWidth="max-content">
          <Box m={5}>
            <Heading>All Data</Heading>
            <Divider />
          </Box>

          <Grid
            templateColumns="repeat(1,minmax(200px,1fr))"
            rowGap={5}
            columnGap={3}
            p={5}
          >
            {users.map((user) => (
              <User user={user} key={user.id} />
            ))}
          </Grid>
        </Flex>
      )}
    </>
  );
}

export default Home;
