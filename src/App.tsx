import React, { useState } from 'react'
import './App.css';

function useListState (initalValue: string[]) {
  const [list, setList] = useState(initalValue);

  return {
    list,
    
    addFunc: (todo: string) => {
      if (todo.length > 0) {
        setList([...list, todo])
      }
    },

    delFunc: (position: number) => {
      const newList = list.filter((_, index) => index !== position);
      setList(newList);
    }
  };
};

const List = (props: { items: string[]; delFunc: (index: number) => void}) => (
  <ul id="mylist">
    {props.items.map((text: string, i: number) => 
          <li key={i}>
            {text}
            <input type="button" value="❌" onClick={e => props.delFunc(i)}/>
          </li>
      )}
  </ul>
)

const Form = (props: {addFunc: (todo: string) => void}) => {
  const [value, setValue] = useState("");
  
  const handleSubmit = (evt: { preventDefault: () => void; }) => {
      evt.preventDefault();
      props.addFunc(value);
      setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Todo Item:
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

function App() {
  const {list, addFunc, delFunc} = useListState([]);

  return (
    <div className="App">

      <Form addFunc={addFunc} />
      <List items={list} delFunc={delFunc}/>

    </div>
  );
}

export default App;
