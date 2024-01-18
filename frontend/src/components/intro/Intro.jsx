import React, { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Intro() {
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies("accessToken");
  const go = useNavigate();

  useEffect(() => {
    (async function () {
      if (cookies.accessToken) {
        try {
          await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/api/auth`, {
            headers: {
              "x-auth-token": cookies.accessToken,
            },
          });
          go("/storage");
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []);

  const modalToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <section className="relative bg-cover object-fill w-full bg-center">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 gap-0 items-center lg:grid-cols-6 xl:grid-cols-5">
            <article className="flex flex-col py-20 px-auto lg:pl-20 pb-10 items-center lg:items-start lg:col-span-4 xl:col-span-3 mt-24 false">
              <h1 className="logo font-semibold text-center md:text-left mb-4 md:whitespace-nowrap text-6xl md:text-7xl -ml-2 drop-shadow-lg">
                <span className="text-google-blue">G</span>
                <span className="text-google-red">o</span>
                <span className="text-google-yellow">o</span>
                <span className="text-google-blue">g</span>
                <span className="text-google-green">l</span>
                <span className="text-black">ing Helper</span>
              </h1>
              <h2 className="mb-4 leading-tight text-center md:text-left text-xl sm:text-2xl">검색을 간편하게!</h2>
              <div className="w-full flex gap-4 flex-row items-center justify-center lg:justify-start ">
                <button
                  onClick={modalToggle}
                  className="inline-flex justify-items-center px-5 py-2 text-base hover:bg-red-400 hover:text-white leading-6 rounded-lg text-red-500 bg-transparent focus:outline-none focus:ring border-2 border-red-400 transition duration-150 ease-in-out md:text-lg md:px-6"
                >
                  시작하기 →
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
      <div className="bg-red-400 w-full h-40 transform -skew-y-[4deg]"></div>
      <div className="absolute top-[30rem] bg-red-400 w-full pt-[10rem] pb-[21rem]">
        <div className="gap-4 p-10 space-y-10 xl:grid xl:grid-cols-3"></div>
      </div>
      <LoginModal openToggle={modalToggle} open={open} />
    </div>
  );
}
