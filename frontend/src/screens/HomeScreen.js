import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Meta from "../components/Meta";

const HomeScreen = ({ match, history }) => {
  // Variables
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  // State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, keyword, pageNumber, history, userInfo]);

  return (
    <>
      <Meta></Meta>
      HomeScreen
    </>
  );
};

export default HomeScreen;
