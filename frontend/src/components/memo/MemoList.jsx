import React from "react";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export default function MemoList({ memoArray, setSelectedMemo, open, setSelectedTitle }) {
  const handleMemoClick = (memo) => {
    setSelectedMemo(memo.time);
    setSelectedTitle(memo.memoTitle);
    open();
  };
  return (
    <div className="flex-col m-6 mt-3 border-t-2">
      {memoArray === null ? (<div className="text-2xl text-gray-300 text-center p-6"> 새 메모를 추가하세요</div>):
      memoArray.length > 0 ?
        memoArray.map((memo, index) => (
          <div key={memo.time}>
            <button
              key={memo.time}
              onClick={() => handleMemoClick(memo)}
              className="flex flex-row mt-1 font-normal text-lg hover:bg-red-100 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg p-3 py-1 w-full cursor-pointer"
            >
              <ArticleOutlinedIcon key={index} className="mr-2 mt-0.5 text-slate-600 font-light" />
              <p className=" text-start" key={memo.time}>
                {memo.memoTitle}
              </p>
            </button>
          </div>
        ))
        : 
        (<div className="text-3xl text-center p-6 ">로딩중</div>)
      }
    </div>
  );
}