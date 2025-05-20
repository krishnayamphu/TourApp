export default function Math() {
  let age = 20;
  return (
    <>
      <p>Message: {age >= 18 ? "you can vote" : "you can not vote"}</p>;
    </>
  );
}
