import { createContext, useContext, useEffect, useState } from "react";

const StatusContext = createContext();

const useResponseStatus = () => {
  return useContext(StatusContext);
};

const StatusProvider = ({ children }) => {
    const [responseStatus, setResponseStatus] = useState(false);


  return (
    <StatusContext.Provider value={{ responseStatus, setResponseStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export { StatusProvider, useResponseStatus };
