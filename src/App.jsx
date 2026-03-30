import Posts from "./components/Posts";

const App = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <h1 className="text-3xl font-bold py-4 sticky top-0 bg-white w-full text-center">
        This is a{" "}
        <span className="text-violet-600 border-b-3 border-b-violet-700">
          Blog
        </span>{" "}
        page
      </h1>
      <Posts />
    </div>
  );
};

export default App;
