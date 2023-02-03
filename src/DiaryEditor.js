import React,{ useEffect, useRef, useState } from 'react';

const DiaryEditor = ({onCreate}) => {
    const authorInput = useRef(); //aurhorInput객체는 current Property에 접근
    const contentInput = useRef();
    
    const [state,setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    }); //작성자, 일기장 쓰는 state로직이 동일하므로 하나의 state로 관리

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * 일기 저장하기 버튼을 수행합니다.
     */
    const handleSubmit = () => {
        // 입력 validation check
        if(state.author.length < 1){
            authorInput.current.focus();
            return;
        }
        if(state.content.length < 5){
            contentInput.current.focus();
            return;
        }
        onCreate(state.author,state.content,state.emotion);
        setState({
            author : "",
            content: "",
            emotion: 1,
        });
        alert('저장 성공');
    } 

    return (
        <div className='DiaryEditor'>
            <h2>오늘의 일기</h2>
            <div>
                <input 
                ref = {authorInput}
                name = 'author'
                value={state.author} 
                onChange ={handleChangeState}
                />
            </div>
            <div>
                <textarea
                ref = {contentInput}
                name = 'content'
                value = {state.content}
                onChange ={handleChangeState}
                />
            </div>
            <div>
                <span>오늘의 감정점수: </span>
                <select 
                name= 'emotion' 
                value={state.emotion} 
                onChange ={handleChangeState}
                >
                    <option value = {1}>1</option>
                    <option value = {2}>2</option>
                    <option value = {3}>3</option>
                    <option value = {4}>4</option>
                    <option value = {5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    );
}

export default React.memo(DiaryEditor);