import axios from "axios";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function SignUp(prop) {
  const { handleLogin } = prop;
  const email = useRef("");
  const password = useRef("");
  const name = useRef("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const emailHandler = (event) => {
    email.current = event.target.value;
  };
  const passwordHandler = (event) => {
    password.current = event.target.value;
  };
  const nameHandler = (event) => {
    name.current = event.target.value;
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (name.current === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "이름을 입력하세요.",
      });
    } else if (email.current === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "이메일을 입력하세요.",
      });
    } else if (password.current === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "비밀번호를 입력하세요.",
      });
    } 
    else if (!emailRegEx.test(email.current)) {
      return Swal.fire({
        icon: "error",
        title: "이메일 형식이 맞지 않습니다.",
        text: "예시: google@gmail.com",
      });
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_ADDR}/api/register`,
        {
          name: name.current,
          email: email.current,
          password: password.current,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleLogin();
      Swal.fire({
        icon: "success",
        title: "회원가입 완료!",
      });
    } catch (error) {
      if (error.response.data.msg === "Email already exists") {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "이미 존재하는 Email 입니다.",
        });
      }
      if (error.response.data.msg === "User name already exists") {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "이미 존재하는 Name 입니다.",
        });
      }
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "회원가입 실패!",
        confirmButtonColor: "#0ea5e9",
      });
    }
  };
  return (
    <div className="p-6  pb-0">
      <form className="space-y-1" onSubmit={submitHandler}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5  "
            placeholder="name"
            onChange={nameHandler}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5  "
            placeholder="google@gmail.com"
            onChange={emailHandler}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Password
          </label>
          <input
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5  "
            onChange={passwordHandler}
          />
        </div>
        <div className="pt-1">
          <label>
            <input
              className=""
              type="checkbox"
              checked={showPassword}
              onChange={handleCheckboxChange}
            />
            <span className="pl-2">비밀번호 보기</span>
          </label>
        </div>
        <div className="flex items-center justify-between"></div>
        <button
          type="submit"
          className="w-full duration-200 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2.5 "
        >
          회원가입
        </button>
        <p className="pt-2 text-sm font-light text-gray-600  ">
          이미 계정이 있으신가요? {""}
          <button
            onClick={handleLogin}
            className="font-medium text-red-600 hover:underline "
          >
            로그인으로 이동
          </button>
        </p>
      </form>
    </div>
  );
}
