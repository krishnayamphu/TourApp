import styles from "./../header.module.css";
export default function Header() {
  //   const style = { backgroundColor: "red", padding: "15px", color: "white" };
  return (
    <>
      {/* <header style={style}>Header</header> */}
      <header className={styles.header}>Brand Logo</header>

      <nav className="nav">
        some nav <span>items</span>
      </nav>

      <div className="bg-blue-500 p-4">Welcome to tailwind css</div>

      <div className="container bg-green-100 my-5 mx-auto p-8">
        <h1 className="font-bold text-5xl">container</h1>
      </div>
    </>
  );
}
