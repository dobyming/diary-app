import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author:"김다민",
    content: "반갑습니다!",
    emotion: 1,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author:"배주현",
    content: "반갑습니다",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author:"강슬기",
    content: "반갑습니닿!",
    emotion: 2,
    created_date: new Date().getTime(),
  }
]

const App = () => {
  return (
    <div className="App">
      <DiaryEditor/>
      <DiaryList diaryList={dummyList}/>
    </div>
  );
}

export default App;
