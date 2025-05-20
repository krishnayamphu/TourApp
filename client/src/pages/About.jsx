export default function About() {
  const words = ["spray", "elite", "exuberant", "destruction", "present"];

  const result = words.filter((word) => word.length > 8);
  return (
    <>
      <div className="container mx-auto">
        {result.map((item) => (
          <p>{item}</p>
        ))}

        <h1 className="text-2xl font-bold text-emerald-600 py-4">About Us</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
          quibusdam. Labore culpa esse incidunt consequatur eius necessitatibus
          nemo hic quidem ad voluptatem, nobis sed, deleniti ipsam cum delectus
          amet libero?
        </p>
      </div>
    </>
  );
}
