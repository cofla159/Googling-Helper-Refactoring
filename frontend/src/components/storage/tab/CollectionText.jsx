import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function CollectionText({ handleDragStart }) {
  const [cookies] = useCookies(["accessToken"]);
  const [collectText, setCollectText] = useState([]);

  useEffect(() => {
    if (cookies.accessToken) {
      axios
        .get(`${process.env.REACT_APP_SERVER_ADDR}/api/textCollect`, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.length === 0) {
            setCollectText(null);
            return;
          }
          setCollectText(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [cookies.accessToken]);

  return (
    <div className="px-16 py-10 overflow-x-hidden space-y-2">
      <div className="text-3xl font-bold pb-2">스크랩한 텍스트</div>
      {!collectText ? (
        <div className="text-3xl text-center p-6">스크랩한 텍스트가 없어요</div>
      ) : collectText.length > 0 ? (
        <>
          {collectText.map((array, index) => (
            <div key={index} className="px-5">
              <div key={array.keyWord} className="text-2xl font-semibold py-4">

              {array.keyWord}
              </div>
              <div key={array.keyword+index} className="flex flex-wrap w-full gap-[19px]">
                {array.text.map((scrap, index) => (
                  <div
                    className="tooltip px-1"
                    data-tip="드래그해서 텍스트를 메모에 추가해보세요"
                    key={index}
                  >
                    <div
                      className="cursor-grab hover:brightness-50 active:cursor-grabbing text-lg text-left border border-slate-300 border-dashed rounded-lg p-2 mb-2"
                      draggable={true}
                      onDragStart={handleDragStart}
                      key={scrap}
                    >
                      {scrap}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-3xl text-center p-6">로딩중</div>
      )}
    </div>
  );
}