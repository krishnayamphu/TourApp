export default function CountLength() {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Submitting form data!");
        }}
      >
        <textarea name="" id=""></textarea>
        <button>Submit</button>
      </form>
    </>
  );
}
