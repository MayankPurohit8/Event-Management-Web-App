import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
function Authentication() {
  const [login, setLogin] = useState(false);
  const [guest, setGuest] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyToken = () => {
      let token = Cookies.get("token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    verifyToken();
  }, []);

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (!name || !email || !password) {
        return console.log("empty fields");
      }

      let res = await axios.post(
        `${backendUrl}/user/register",
        {
          name,
          email,
          password,
          guest,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.log("something went wrong while registering the user");
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      if (!email || !password) {
        return console.log("empty fields");
      }
      let res = await axios.post(
        `${backendUrl}/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setIsLoggedIn(true);
        window.location.reload();
      }
    } catch (err) {
      console.log("something went wrong while logging in the user");
    }
  };
  return (
    <>
      {isLoggedIn ? null : (
        <div className="container w-full h-screen flex justify-center items-center bg-white/30 backdrop-blur-sm absolute z-10">
          <div className=" w-1/3 h-2/3  border-gray-700 shadow-2xl p-5 rounded-xl bg-white ">
            <h2 className="text-2xl font-bold text-center text-gray-700">
              {login ? "Login" : "Create an Account"}
            </h2>
            <form
              className="mt-4"
              onSubmit={login ? handleLogin : handleRegister}
            >
              {login ? null : (
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-600 ">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="w-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                  {login ? "Login" : "Create Account"}
                </button>
                <button
                  type="button"
                  className="w-1/2 ml-2 bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400"
                  onClick={() => setLogin(!login)}
                >
                  {login ? "New User?" : "Already a user?"}
                </button>
              </div>
            </form>
            {login ? null : (
              <div className="mt-6 text-center flex justify-center gap-5 items-center">
                <div className="text-md font-bold text-center text-gray-700">
                  Account Type :
                </div>
                <button
                  className={`${
                    guest ? "bg-green-500 focus:text-white " : ""
                  } w-1/3 p-2 rounded-lg hover:bg-green-600 `}
                  onClick={() => setGuest(true)}
                >
                  Guest
                </button>
                <button
                  className={`${
                    guest ? "" : "bg-green-500 focus:text-white "
                  } w-1/3 p-2 rounded-lg hover:bg-green-600 `}
                  onClick={() => setGuest(false)}
                >
                  Event Manager
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Authentication;
