import { useMemo, useEffect, useRef,useState, useCallback } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const App = () => {
  const [data,setData] = useState([]); //현재 state인 data를 diaryList로 넘기고, 상태변화는 Editor에서 props로 넘겨져 이뤄진다.

  const dataId = useRef(0); //id를 리스트에 넘겨줘야 함 

  //API 호출하기
  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments'
    ).then((res)=>res.json());
    
    const initData = res.slice(0,20).map((it)=>{
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random()*5)+1,
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    });

    setData(initData);
  }

  //mount 되자마자 API call하기
  useEffect(()=>{
    getData();
  },[])

  //일기 생성 기능
  const onCreate = useCallback(
    (author,content,emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData((data)=>[newItem,...data]); //newItem이 맨 위에 추가되도록 setData 매개변수로 전달 및 초기 빈배열 세팅 트러블 슈팅(함수형 update)
  },[]); //불필요한 호출을 useCallback()을 통해 최적화

  //일기 삭제 기능(id를 기준으로 삭제)
  const onRemove = useCallback(
    (targetId) => {
    setData((data)=>data.filter((it)=> it.id !== targetId)); //최신 state 전달
  },[]);

  //일기 수정 기능
  const onEdit = useCallback((targetId,newContent) => {
    setData((data) =>data.map((it)=> it.id === targetId ? {...it,content: newContent} : it))
  },[]);

  const getDiaryAnalysis = useMemo(()=> {
    const goodCnt = data.filter((it)=> it.emotion >= 3).length; //기분이 좋은 값의 갯수
    const badCnt = data.length - goodCnt;
    const goodRatio = (goodCnt / data.length) * 100;
    //위의 연산을 최적화 하고 싶다 -> useMemo활용
    return {goodCnt,badCnt,goodRatio};
  },[data.length]);

  const {goodCnt,badCnt,goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/> {/* 일기 작성 건들을 prop으로 넘겨줌 */}
      <div>전체 일기 : {data.length} </div>
      <div>기분 좋은 일기 개수 : {goodCnt} </div>
      <div>기분 나쁜 일기 개수: {badCnt}</div>
      <div>기분 좋은 일기 비율: {goodRatio+'%'}</div>
      <DiaryList onRemove = {onRemove} diaryList={data} onEdit={onEdit}/>
    </div>
  ); 
}

export default App;
