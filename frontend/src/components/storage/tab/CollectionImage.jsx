import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ImageSpreader from "../ImageSpreader";

export default function CollectionImage({ handleDragStart }) {
  const [cookies] = useCookies(["accessToken"]);
  const [collectImage, setCollectImage] = useState([]);

  useEffect(() => {
    if (cookies.accessToken) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_ADDR}/api/imgCollect`,

          {
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }
        )
        .then((res) => {
          if (res.data.length === 0) {
            setCollectImage(null);
            return;
          }
          setCollectImage(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return (
    <div className="px-16 py-10 overflow-x-hidden space-y-6">
      <div className="text-3xl font-bold">스크랩한 이미지</div>
      {!collectImage ? (
        <div className="text-3xl text-center p-6">스크랩한 이미지가 없어요</div>
      ) : collectImage.length > 0 ? (
        <div className="flex flex-wrap w-full gap-[19px]">
          <ImageSpreader images={collectImage} handleDragStart={handleDragStart} />
        </div>
      ) : (
        <div className="text-3xl text-center p-6">로딩중</div>
      )}
    </div>
  );
}
