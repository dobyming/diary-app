import { useEffect, useRef,useState } from 'react';
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
  const onCreate = (author,content,emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem,...data]); //newItem이 맨 위에 추가되도록 setData 매개변수로 전달
  };

  //일기 삭제 기능(id를 기준으로 삭제)
  const onRemove = (targetId) => {
    const newDiarylst = data.filter((it)=> it.id !== targetId);
    setData(newDiarylst);
  };

  //일기 수정 기능
  const onEdit = (targetId,newContent) => {
    setData(
      data.map((it)=> it.id === targetId ? {...it,content: newContent} : it)
    )
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/> {/* 일기 작성 건들을 prop으로 넘겨줌 */}
      <DiaryList onRemove = {onRemove} diaryList={data} onEdit={onEdit}/>
    </div>
  ); 
}

export default App;
