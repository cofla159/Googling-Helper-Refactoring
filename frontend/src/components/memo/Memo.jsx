import React, { useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

export default function Memo({
  open,
  receiveMemo,
  draggedElementContent,
  setDraggedElementContent,
  selectedMemo,
  selectedTitle,

}) {
  const [cookies] = useCookies("accessToken");
  const editorRef = useRef();
  const titleRef = useRef();

  const goList = () => {
    receiveMemo();
    open(true);
  };

  // 메모 삭제
  const deleteMemo = () => {
    if (cookies.accessToken) {

    Swal.fire({
      title: "메모를 삭제하시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios
          .delete(`${process.env.REACT_APP_SERVER_ADDR}/api/deleteMemo`, {
            data: { time: selectedMemo },
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "삭제 완료!",
              text: "삭제되었습니다.",
            });
            goList();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "삭제 오류!",
            });
          });
      }
    });}
  };

  // 메모 저장
  const saveContent = () => {
    if (cookies.accessToken) {

    const data = editorRef.current?.getInstance().getHTML();

    const date = new Date();

    const time = selectedMemo ? selectedMemo : date.getTime();

    if (!titleRef.current) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "제목을 입력하세요.",
      });
      return;
    }
    
    if (data) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_ADDR}/api/saveMemo`,
          {
            time: time,
            memoTitle: titleRef.current,
            memoContents: data,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "저장 완료!",
            text: "메모를 저장했습니다.",
          });
          goList();
        })
        .catch((error) => {
          console.error(error);
        });
    }}
  };
  // 제목이 있으면 메모 내용 불러오기
  useEffect(() => {
    if (cookies.accessToken) {

    if (selectedMemo) {
      receiveContent();
    }
    else{
    editorRef.current?.getInstance().setHTML(" ");
    }}
  }, [selectedMemo]);
  
  // 메모 받아와서 셋팅
  const receiveContent = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDR}/api/memoContents`,
        {
          time: selectedMemo,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((res) => {
        titleRef.current = selectedTitle;
        const contentsHTML = res.data.memoContent;
        editorRef.current?.getInstance().setHTML(contentsHTML);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const changeTitle = (event) => {
    titleRef.current = event.target.value;
  };

  // Drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    const data = editorRef.current?.getInstance().getHTML();
    editorRef.current?.getInstance().setHTML(data + draggedElementContent);
    setDraggedElementContent("");
  };

  const toPdf = async (name) => {
    document
      .querySelector(".ProseMirror.toastui-editor-contents")
      ?.setAttribute("style", "height: auto !important; ");
    
    html2canvas(
      document.querySelector(".ProseMirror.toastui-editor-contents"),
      {
        logging: true,
        letterRendering: 1, 
        allowTaint : true, 
        useCORS: true ,
        // 테두리
        // backgroundColor: "transparent",
      }
    ).then((canvas) => {
      let imgData = canvas.toDataURL("image/png");

      let imgWidth = 180;
      let pageHeight = imgWidth * 1.414;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let margin = 20;

      const doc = new jsPDF("p", "mm", "a4");
      let position = 0;

      doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 40) {
        position = heightLeft - imgHeight - 40;
        doc.addPage();
        doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(`${name}.pdf`);
    });

    document
      .querySelector(".ProseMirror.toastui-editor-contents")
      ?.setAttribute("style", "height: 100% !important;");
  };

  return (
    <div className="p-4 overflow-auto">
      <div className="overflow-auto">
        <div className="pb-2">
          <input
            className="w-[100%] border rounded h-10 pl-6"
            defaultValue={selectedTitle}
            onChange={changeTitle}
            placeholder="Title"
          />
        </div>
        <div
          className="droppable overflow-auto"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Editor
            initialValue=" "
            ref={editorRef}
            previewStyle="vertical"
            height="540px"
            initialEditType="wysiwyg"
            language="ko-KR"
            // useCommandShortcut={true}
            hideModeSwitch={true}
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task"],
              ["code"],
            ]}
          />
        </div>
        <div className="flex justify-between py-2 pr-1">
          <div className="flex space-x-2">
            <button className="btn-blue" onClick={() => open(true)}>
              목록
            </button>
            <button
              className="btn-yellow hidden sm:block"
              onClick={() => {
                toPdf(titleRef.current);
              }}
            >
              PDF
            </button>
          </div>
          <div className="space-x-2 flex">
            {selectedMemo && (
              <button className="btn-red" onClick={deleteMemo}>
                삭제
              </button>
            )}
            <button className="btn-green" onClick={saveContent}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
