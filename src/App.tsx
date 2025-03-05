import "./App.css";
import "./index.css";
import styled from "styled-components";
import Moon from "/images/icon-moon.svg";
import Sun from "/images/icon-sun.svg";
import Cross from "/images/icon-cross.svg";
import Check from "/images/icon-check.svg";
import { useState } from "react";
import { GlobalStyle } from "./GlobalStyles.tsx";

function App() {
  const [todos, setTodos] = useState<
    Array<{ id: number; name: string; isCompleted: boolean }>
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleKeyEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newTodo = {
        id: Math.random(),
        name: inputValue,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos =
    filter === "All"
      ? todos
      : filter === "Active"
      ? todos.filter((todo) => !todo.isCompleted)
      : todos.filter((todo) => todo.isCompleted);

  return (
    <Container>
      <GlobalStyle darkMode={darkMode} />

      <Heading>
        <LogoAndTheme>
          <TodoTitle>T O D O</TodoTitle>
          <ThemeButton onClick={() => setDarkMode(!darkMode)}>
            {!darkMode ? (
              <img src={Moon} alt="moon icon" />
            ) : (
              <img src={Sun} alt="sun icon" />
            )}
          </ThemeButton>
        </LogoAndTheme>
        <Input
          value={inputValue}
          type="text"
          style={{
            backgroundColor: darkMode ? "#25273D" : "",
            transition: "0.2s",
            color: darkMode ? "white" : "",
          }}
          className="main-input"
          placeholder="Create a new todo..."
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyEnter}
        />
      </Heading>
      <Todos
        style={{
          backgroundColor: darkMode ? "#25273D" : "",
          transition: "0.2s",
          color: darkMode ? "white" : "",
        }}>
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            style={{
              cursor: "pointer",
              transition: "0.2s",
              borderBottom: darkMode ? "1px solid #393A4B" : "",
            }}>
            <TodoNameWrap
              onClick={() => {
                setTodos(
                  todos.map((t) =>
                    t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
                  )
                );
              }}>
              <Circle
                style={{
                  position: "relative",
                  cursor: "pointer",
                  background: todo.isCompleted
                    ? "linear-gradient(to right, #55DDFF, #C058F3)"
                    : "transparent",
                  border: todo.isCompleted ? "none" : "",
                }}>
                {todo.isCompleted ? <CheckImg src={Check} /> : null}
              </Circle>
              <TodoName
                style={{
                  transition: "0.2s",
                  textDecoration: todo.isCompleted ? "line-through" : "",
                  color:
                    todo.isCompleted && darkMode
                      ? "#4D5067"
                      : darkMode
                      ? "#C8CBE7"
                      : todo.isCompleted && !darkMode
                      ? "#D1D2DA"
                      : "",
                }}>
                {todo.name}
              </TodoName>
            </TodoNameWrap>
            <img
              onClick={() => handleDelete(todo.id)}
              style={{ cursor: "pointer" }}
              src={Cross}
              alt="cross icon"
            />
          </Todo>
        ))}
        <TodoInformation style={{ transition: "0.2s" }}>
          <span style={{ color: darkMode ? "#5B5E7E" : "" }}>
            {todos.filter((todo) => !todo.isCompleted).length} items left
          </span>
          <ClearButton
            style={{ color: darkMode ? "#5B5E7E" : "" }}
            onClick={() => setTodos(todos.filter((item) => !item.isCompleted))}>
            Clear Completed
          </ClearButton>
        </TodoInformation>
      </Todos>
      <FilterContainer
        darkMode={darkMode}
        style={{
          backgroundColor: darkMode ? "#25273D" : "",
          transition: "0.2s",
          color: darkMode ? "white" : "",
        }}>
        <button
          onClick={() => setFilter("All")}
          style={{ color: filter === "All" ? "#3A7CFD" : "" }}>
          All
        </button>
        <button
          onClick={() => setFilter("Active")}
          style={{ color: filter === "Active" ? "#3A7CFD" : "" }}>
          Active
        </button>
        <button
          onClick={() => setFilter("Completed")}
          style={{ color: filter === "Completed" ? "#3A7CFD" : "" }}>
          Completed
        </button>
      </FilterContainer>
      <div style={{ marginTop: "4rem" }}>
        <span
          style={{
            color: darkMode ? "5B5E7E" : "#9495A5",
            fontSize: "1.4rem",
          }}>
          Drag and drop to reorder list
        </span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.6rem;

  @media only screen and (min-width: 90rem) {
    max-width: 54rem;
    margin: auto;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.8rem;
  font-size: 1.2rem;
  background-color: white;
  border-radius: 0.5rem;
  border: none;

  @media only screen and (min-width: 90rem) {
    font-size: 1.8rem;
  }
`;

const Heading = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ThemeButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const LogoAndTheme = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoTitle = styled.h1`
  color: white;
  font-size: 3rem;
  letter-spacing: 3px;
`;

// Todos

const Todos = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 1px 4px 30.5px #0101012d;
`;

const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 2rem;
  border-bottom: 1px solid #e3e4f1;

  @media only screen and (min-width: 90rem) {
    padding: 2.1rem 2.4rem;
  }
`;

const TodoName = styled.span`
  font-size: 1.2rem;
  color: #494c6b;

  @media only screen and (min-width: 90rem) {
    font-size: 1.8rem;
  }
`;

const TodoNameWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Circle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid #979797;

  &:hover {
    border-color: linear-gradient(right, #55ddff, #c058f3);
    transition: 0.2s;
  }

  @media only screen and (min-width: 90rem) {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const TodoInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 2rem;

  span {
    color: #9495a5;
    font-size: 1.2rem;
  }
`;

const ClearButton = styled.button`
  all: unset;
  color: #9495a5;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    color: #3a7cfd;
    transition: 0.2s;
  }
`;

// Filter

const FilterContainer = styled.div<{ darkMode: boolean }>`
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.9rem;
  background-color: white;
  padding: 1.6rem 2rem;
  box-shadow: 1px 4px 10.5px #0101012b;

  button {
    all: unset;
    cursor: pointer;
    color: #9495a5;

    &:hover {
      color: ${({ darkMode }) => (darkMode ? "#E3E4F1" : "#494C6B")};
      transition: 0.2s;
    }
  }

  @media only screen and (min-width: 90rem) {
    font-size: 1.4rem;
  }
`;

const CheckImg = styled.img`
  position: absolute;
  left: 50%;
  bottom: 25%;
  transform: translateX(-50%);
`;

export default App;
