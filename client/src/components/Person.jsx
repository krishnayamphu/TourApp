export default function Person(props) {
  return (
    <>
      <p>Name: {props.person.name}</p>
      <p>Age: {props.person.age}</p>
    </>
  );
}
