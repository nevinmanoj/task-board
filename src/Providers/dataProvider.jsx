import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { server } from "../constants";

export const dataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [pic, setPic] = React.useState(null);
  const [tokenExpiryTime, setTokenExpiryTime] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    console.log("hihihii");
    if (tokenExpiryTime < Math.floor(Date.now() / 1000)) {
      logout();
    }
  }, []);
  React.useEffect(() => {
    if (jwtToken != null) getAllTasks(jwtToken);
  }, [jwtToken]);

  const decodeAndSetTokenDetails = (token) => {
    const decoded = jwtDecode(token);
    setName(decoded["name"]);
    setEmail(decoded["email"]);
    setPic(decoded["pic"]);
    setTokenExpiryTime(decoded["exp"]);
  };

  const login = async (response) => {
    setLoading(true);
    axios
      .post(server + "/auth/login", {
        tokenId: response.credential,
      })
      .then((res) => res.data)
      .then((data) => {
        decodeAndSetTokenDetails(data.accessToken);
        localStorage.setItem("token", data.accessToken);
        setJwtToken(data.accessToken);
        getAllTasks(data.accessToken);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Authentication Error:", error);
        setLoading(false);
      });
  };
  const logout = () => {
    setJwtToken(null);
    setName(null);
    setEmail(null);
    setPic(null);
    setTokenExpiryTime(0);
    setTasks([]);
    localStorage.clear();
  };

  const getAllTasks = (token) => {
    setLoading(true);
    axios
      .get(server + "/task", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setTasks(data.tasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error(" Error:", error);
        setLoading(false);
      });
    setTasks([]);
  };
  const createTask = async (taskDetails) => {
    const result = await runAxios("post", {
      title: taskDetails.title,
      addedDate: taskDetails.addedDate,
      isCompleted: taskDetails.isCompleted,
      completionDate: taskDetails.completionDate,
    });
    if (result.success) {
      const newdata = [result.data.data, ...tasks];
      setTasks(newdata);
    }
  };
  const modifyTask = async (taskDetails, id) => {
    const result = await runAxios("put", {
      title: taskDetails.title,
      addedDate: taskDetails.addedDate,
      isCompleted: taskDetails.isCompleted,
      completionDate: taskDetails.completionDate,
      id,
    });

    if (result.success) {
      const newdata = tasks.map((item) =>
        item._id === id ? { ...result.data.data } : item
      );
      setTasks(newdata);
    }
  };
  const deleteTask = async (id) => {
    const result = await runAxios("delete", {
      id,
    });
    if (result.success) {
      const newdata = tasks.filter((item) => item._id !== id);
      setTasks(newdata);
    }
  };

  const runAxios = async (method, data) => {
    const config = {
      method,
      url: server + "/task",
      headers: {
        authorization: "Bearer " + jwtToken,
      },
      data,
    };
    // setLoading(true);
    const result = await axios(config)
      .then((response) => {
        // getAllTasks(jwtToken);
        console.log(
          "Data " + method + " successfully! Response:",
          response.data
        );
        // setLoading(false);
        return { data: response.data, success: true };
      })
      .catch((error) => {
        console.error("Error " + method + "ing data:", error);
        // setLoading(false);
        return { success: false };
      });
    return result;
  };

  // const populateUI = () => {
  //   for (var i = 0; i < 15; i++) {
  //     const config = {
  //       method: "post",
  //       url: server + "/task",
  //       headers: {
  //         authorization: "Bearer " + jwtToken,
  //       },
  //       data: {
  //         title: "title" + i,
  //         desc: "desc" + i,
  //         addedDate: Date.now() + i * 100,
  //         isCompleted: i % 2 == 0,
  //         completionDate: i % 2 == 0 ? Date.now() + i * 100 + 2000 : undefined,
  //       },
  //     };
  //     axios(config)
  //       .then((response) => {
  //         getAllTasks(jwtToken);
  //         console.log(
  //           "Data " + method + " successfully! Response:",
  //           response.data
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error " + method + "ing data:", error);
  //       });
  //   }
  // };

  return (
    <dataContext.Provider
      value={{
        jwtToken,
        pic,
        email,
        name,
        logout,
        login,
        tasks,
        createTask,
        modifyTask,
        deleteTask,
        loading,
        // populateUI,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
