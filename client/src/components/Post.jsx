export default function Post(props) {
  const posts = props.posts;
  return (
    <>
      {posts.map((item, index) => (
        <div>
          <h2 key={index}>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}
    </>
  );
}
