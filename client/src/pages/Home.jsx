import { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Knob } from "primereact/knob";
export default function Home() {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const [value, setValue] = useState(0);
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-emerald-600 py-4">
          Welcome to Homepage
        </h1>
        <Button label="Check" icon="pi pi-check" />

        <div className="card flex justify-content-center w-[200px]">
          <Dropdown
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Select a City"
            className="w-full md:w-14rem"
          />

          <Knob value={value} onChange={(e) => setValue(e.value)} />
        </div>
      </div>
    </>
  );
}
