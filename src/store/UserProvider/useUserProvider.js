import { useContext } from "react";
import { userContext } from "./UserProvider";

const useUserProvider = () => {
  return useContext(userContext);

}

export default useUserProvider;