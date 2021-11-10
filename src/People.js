import { useData } from "./DataContext";

export default function People() {

  const people = useData();

  return (
    <>
      {people.map((person, index) => (<a
        key={`name${index}`}
        className="App-link"
        style={{display: 'block'}}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hello {person.name}
      </a>))}
    </>
  );
}