import { useEffect, useState } from "react";

export default function Hook() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    setTotal(() => {
      return count + 100;
    });
  }, [count]);
  return (
    <>
      <div className="container mx-auto py-4">
        <p>Count: {count}</p>

        <p>Total: {total}</p>
        <button
          className="bg-green-500 p-2 rounded hover:bg-green-600 hover:text-white transition duration-300"
          onClick={() => setCount(count + 1)}
        >
          Increase
        </button>
      </div>
    </>
  );
}
