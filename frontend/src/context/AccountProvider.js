import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const [user, setUser] = useState();

  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export const AccountState = () => {
  return useContext(AccountContext);
};

export default AccountProvider;
