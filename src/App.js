import { useMemo, useEffect, useRef, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state,action) => {
  switch(action.type) {
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data, //onCreate에서 setting한 값 spread
        created_date
      }
      return [newItem,...state]; 
    }
    case 'REMOVE':{
      return state.filter((it)=> it.id !== action.targetId);
    }
    case 'EDIT':{
      return state.map((it)=>
      it.id === action.targetId ? 
      {...it,content: action.newContent} : it)
    }
    default:
      return state;
  }
}; //상태변화 함수 관리(state:이전 상태, action:switch문에 해당하는 action 처리)

const App = () => {
  // const [data,setData] = useState([]); //현재 state인 data를 diaryList로 넘기고, 상태변화는 Editor에서 props로 넘겨져 이뤄진다.
  const [data,dispatch] = useReducer(reducer,[]); //상태변화 함수 리팩토링(App 컴포넌트 밖에다가 reduecer 정의)을 위한 useReducer hook 사용

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
    dispatch({type:'INIT',data:initData}); //'INIT'이라는 액션으로 받아, data에 initData로 초기화
  }

  //mount 되자마자 API call하기
  useEffect(()=>{
    getData();
  },[])

  //일기 생성 기능
  const onCreate = useCallback(
    (author,content,emotion) => {
    dispatch({
      type:'CREATE',
      data:{author,content,emotion, id:dataId.current }
    });
    dataId.current += 1;
  },[]); //불필요한 호출을 useCallback()을 통해 최적화

  //일기 삭제 기능(id를 기준으로 삭제)
  const onRemove = useCallback((targetId) => {
    dispatch({type:'REMOVE',targetId});
  },[]);

  //일기 수정 기능
  const onEdit = useCallback((targetId,newContent) => {
    dispatch({type:'EDIT',targetId,newContent})
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
