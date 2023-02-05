import { useContext } from "react";
import DiaryItem from "./DiaryItem";
import {DiaryStateContext} from "./App";

const DiaryList = () => {
    const diaryList = useContext(DiaryStateContext); //Provider - context로부터 data 받아옴
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>    
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it)=> (
                    <DiaryItem key = {it.id} {...it}/>
                ))}
            </div>
        </div>
    );
}

DiaryList.defaultProps = {
    diaryList : [],
}; //prop이 빈 배열로 들어올 때 에러 없이 defaultProps로 처리 

export default DiaryList;