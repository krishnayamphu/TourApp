import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [gender, setGender] = useState("male");
  const [course, setCourse] = useState("react");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Hello ${name} and your email is ${email}`);
  };

  return (
    <>
      <div className="container mx-auto mt-5">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              className="border p-1"
              placeholder="Your fullname"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Your email"
              className="border p-1"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <p>
              [Name:{name}, Email: {email} ({email.length})]
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            Agree to terms and conditions
            <p>[{terms ? "on" : "off"}]</p>
          </div>
          <div className="flex gap-2">
            <input
              onChange={(e) => setGender(e.target.value)}
              type="radio"
              name="gender"
              value="male"
              defaultChecked={true}
            />
            Male
            <input
              onChange={(e) => setGender(e.target.value)}
              type="radio"
              name="gender"
              value="female"
            />
            Female
            <p>[{gender}]</p>
          </div>

          <div className="flex gap-2">
            <label htmlFor="course">Course</label>
            <select
              className="border"
              value={course}
              id="course"
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
            </select>
            <p>[{course}]</p>
          </div>
          <button className="bg-sky-500 py-1 px-3">Submit</button>
        </form>
      </div>
    </>
  );
}
