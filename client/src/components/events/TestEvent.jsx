export default function TestEvent() {
  function hello(name) {
    alert(`Hello ${name}`);
  }

  return (
    <>
      <button onClick={() => hello("Hari")}>Say Hello</button>
    </>
  );
}
