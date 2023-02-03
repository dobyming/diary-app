import React,{ useRef, useState } from "react";

const DiaryItem = ({id,author,content,emotion,created_date,onRemove,onEdit}) => {
    const [isEdit,setIsEdit] = useState(false);
    const toggleIsEdit = () => {setIsEdit(!isEdit)} //isEdit이 setIsEdit으로 인해 true로 변환 시, 수정 기능 활성화

    const [updateContent,setUpdateContent] = useState(content); //수정 form state 관리

    const handleRemove = () => {
        if(window.confirm(`${id+1}번째 일기를 삭제하시겠습니까?`)){
            onRemove(id);
        }
    }

    const handleQuitEdit = () => {
        setIsEdit(false);
        setUpdateContent(content);
    }

    const handleEdit = () => {
        if(updateContent.length < 5){
            updateArea.current.focus();
            return;
        }
        if(window.confirm(`${id+1}번째 일기를 수정하시겠습니까?`)){
            onEdit(id,updateContent);
            toggleIsEdit();
        }
    }

    const updateArea = useRef();

    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자: {author} | 감정점수: {emotion}</span>
                <br/>
                <span className="date">
                    {new Date(created_date).toLocaleString()}
                </span>
            </div>
            <div className="content">
                { isEdit ? 
                <><textarea 
                ref = {updateArea}
                value={updateContent}
                onChange={(e)=>setUpdateContent(e.target.value)}/></> 
                : <>{content}</> 
                }
            </div>
            {isEdit ? 
            <>
                <button onClick={handleQuitEdit}>수정 취소</button>
                <button onClick={handleEdit}>수정 완료</button>
            </> 
            : 
            <>
                <button onClick={handleRemove}>삭제하기</button>
                <button onClick={toggleIsEdit}>수정하기</button>
            </>} 
        </div>
    )
}

export default React.memo(DiaryItem);