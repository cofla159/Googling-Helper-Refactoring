import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ receiveSearchContents, searchRef }) {
  const [cookies, setCookie, removeCookie] = useCookies("accessToken");
  const [userName, setUserName] = useState(null);
  const go = useNavigate();
  const logout = async () => {
    if (cookies.accessToken) {
      await axios
        .get(`${process.env.REACT_APP_SERVER_ADDR}/api/logout`, {
          headers: {
            "x-auth-token": cookies.accessToken,
          },
        })
        .then((res) => {
          removeCookie("accessToken");
          go("/");
        })
        .catch((error) => {
          console.error(error);
          removeCookie("accessToken");
          go("/");
        });
    } else {
      go("/");
    }
  };
  useEffect(() => {
    if (cookies.accessToken) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_ADDR}/api/giveUserName`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }
        )
        .then((res) => {
          setUserName(res.data.username);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인이 필요합니다.",
      });
      go("/");
    }
  },[]);

  const changeSearchContents = (event) => {
    searchRef.current = event.target.value;
  };

  return (
    <div className="shadow z-10 mb-0.5">
      <div className="flex items-center text-3xl p-3 sm:px-6 lg:px-8 justify-between">
        <div className="logo">
          <span className="text-google-blue">G</span>
          <span className="text-google-red">o</span>
          <span className="text-google-yellow">o</span>
          <span className="text-google-blue">g</span>
          <span className="text-google-green">l</span>
          <span className="text-black">ing Helper</span>
        </div>
        <div className="w-[50%]">
          <div className="flex text-sm border rounded-lg focus:ring-blue-300">
            <input
              className="w-[100%] h-10 pl-4 focus:ring-2 rounded-lg focus:outline-none"
              onChange={changeSearchContents}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  receiveSearchContents(searchRef.current);
                }
              }}
              placeholder="Search"
            />
            <button
              onClick={() => {
                receiveSearchContents(searchRef.current);
              }}
              className="w-16 duration-200 focus:ring-2 focus:ring-black focus:outline-none rounded-lg "
            >
              {" "}
              <SearchIcon />
            </button>
          </div>
        </div>
        <div className="flex space-x-2 items-end">
          <div className="flex pr-6 space-x-1 items-baseline">

          <div className="font-semibold flex text-2xl ">{userName}</div>
          <div className="text-base ">님</div>
          </div>
          <button onClick={logout} className="btn-white">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
