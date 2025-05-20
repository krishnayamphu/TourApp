import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello ${formData}`);
  };

  return (
    <>
      <div className="container mx-auto mt-5">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="border p-1"
            placeholder="Your fullname"
            onChange={handleChange}
            required
          />
          <button className="bg-sky-500 py-1 px-3">Submit</button>
        </form>
      </div>
    </>
  );
}
