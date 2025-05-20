import Item from "./Item";

export default function List() {
  const list = [
    { name: "Apple", isPacked: true },
    { name: "Orange", isPacked: true },
    { name: "Mango", isPacked: true },
    { name: "Banana", isPacked: false },
  ];
  return (
    <>
      <ul>
        {list.map((item) => (
          <Item isPacked={item.isPacked} name={item.name} />
        ))}
      </ul>
    </>
  );
}
