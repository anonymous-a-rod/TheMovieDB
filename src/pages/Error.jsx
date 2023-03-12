import { Link } from "react-router-dom";
import SearchFilter from "../components/SearchFilter";

const Error = () => {
    return ( 
        <section className="h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-stone-200 mb-4">Oops!</h1>
      <p className="text-xl text-stone-200 text-center mb-8">
        We couldn't find the page you were looking for.
      </p>
      <div className="mb-4">
        <SearchFilter />
      </div>
      
      <Link
        to="/"
        className="text-stone-400 font-medium hover:text-stone-500 mb-2"
      >
        ← Back to home
      </Link>
      <p className="text-stone-200 font-medium hover:text-stone-300">
        Or&nbsp;
        <Link to="/team" className="underline hover:text-stone-400">
          contact us
        </Link>{" "}
        if you need further assistance.
      </p>
    </section>
     );
}
 
export default Error;