import { useRef,useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const App = () => {
  const [data,setData] = useState([]); //현재 state인 data를 diaryList로 넘기고, 상태변화는 Editor에서 props로 넘겨져 이뤄진다.

  const dataId = useRef(0); //id를 리스트에 넘겨줘야 함 

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
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/> {/* 일기 작성 건들을 prop으로 넘겨줌 */}
      <DiaryList onRemove = {onRemove} diaryList={data}/>
    </div>
  ); 
}

export default App;
