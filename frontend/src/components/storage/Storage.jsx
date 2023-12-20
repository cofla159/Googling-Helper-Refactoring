import React, { useCallback, useEffect, useRef, useState } from "react";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../intro/Header";
import Memo from "../memo/Memo";
import MemoList from "../memo/MemoList";

import { Resizable } from "re-resizable";


export default function Storage() {
  const [cookies] = useCookies(["accessToken"]);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState();
  const [openList, setOpenList] = useState(true);
  const [memoArray, setMemoArray] = useState([]);
  const [draggedElementContent, setDraggedElementContent] = useState("");

  const DATE = "DATE";
  // 검색
  const [searchContents, setSearchContents] = useState();
  const [searchResultArray, setSearchResultArray] = useState([]);
  const searchRef = useRef();
  const [searchShowList, setSearchShowList] = useState(DATE);
  // 리스트 렌더
  const [showKeywords, setShowKeywords] = useState(DATE);

  const receiveMemo = useCallback(async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDR}/api/allMemoTitle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.message === "empty") {
          setMemoArray(null);
          return;
        }
        setMemoArray(res.data.memoData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cookies.accessToken]);

  //memo API
  useEffect(() => {
    if (cookies.accessToken) {
      receiveMemo();
    }
  }, [cookies.accessToken, receiveMemo]);

  const handleDragStart = (event) => {
    setDraggedElementContent(event.target.outerHTML); // 드래그한 요소의 내용을 저장
    // console.log(event.target.outerHTML);
  };

  const handleNewMemo = () => {
    setSelectedTitle("");
    setSelectedMemo("");
    setOpenList();
  };

  // search

  const receiveSearchContents = async (search) => {
    if (cookies.accessToken) {
      setSearchContents(true);
      setSearchResultArray([]);
      if (searchShowList !== undefined) {
        setShowKeywords(searchShowList);
      }

      if (!search || search.trim() === "" || search.includes("?")) {
        setSearchResultArray(null);
        return;
      }
      
      
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_ADDR}/api/searchData`,
          { search: search },
          {
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }
        )
        .then((res) => {
          if (res.data.length === 0) {
            setSearchResultArray(null);
            return;
          }
          setSearchResultArray(res.data);
        })
        .catch((error) => {
          console.error(error);
          setSearchResultArray(null);
        });
    }
  };

  return (
    <>
      <Header
        receiveSearchContents={receiveSearchContents}
        searchRef={searchRef}
      />
      <div className="flex break-keep ">
        <div className="flex-grow w-[]">
          {
            <Scrap
              handleDragStart={handleDragStart}
              searchContents={searchContents}
              setSearchContents={setSearchContents}
              searchResultArray={searchResultArray}
              searchRef={searchRef}
              showKeywords={showKeywords}
              setShowKeywords={setShowKeywords}
              setSearchShowList={setSearchShowList}
            />
          }
        </div>
        <Resizable
          defaultSize={{ width: "30%", height: "100%" }}
          className=""
          minWidth={"20%"}
          maxWidth={"50%"}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          handleStyles={{
            left: {
              width: "3px",
              height: "100%",
              left: "0px",
              backgroundColor: "#d1d5db",
            },
          }}
        >
          <div className="h-[100vh] border-l overflow-auto viewsize relative">
            <div className="flex p-6 pb-0 flex-row w-full justify-between items-end ">
              <div className="text-2xl font-bold pl-4 ">메모</div>
              <button className="btn-bluewhite w-fit" onClick={handleNewMemo}>
                새 메모 만들기
              </button>
            </div>
            <div className="flex-col border-gray-300 overflow-auto">
              {openList ? (
                <MemoList
                  memoArray={memoArray}
                  open={setOpenList}
                  setSelectedMemo={setSelectedMemo}
                  setSelectedTitle={setSelectedTitle}
                />
              ) : (
                <>
                  <Memo
                    open={setOpenList}
                    receiveMemo={receiveMemo}
                    draggedElementContent={draggedElementContent}
                    setDraggedElementContent={setDraggedElementContent}
                    selectedMemo={selectedMemo}
                    selectedTitle={selectedTitle}
                  />
                </>
              )}
            </div>
          </div>
        </Resizable>
      </div>
    </>
  );
}
