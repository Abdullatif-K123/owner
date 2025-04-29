import { useQuery } from "@tanstack/react-query";
import controllers from "../../../constants/controllers";
import { homeAPI } from "./apis";

const homeQueries = {
  useSelectQuery: () => {
    const queryResult = useQuery([controllers.HOME, "getHomeData"], () =>
      homeAPI.getAll()
    );
    return queryResult;
  },
};

export default homeQueries;
