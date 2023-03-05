import Banner from "../components/Banner";
import PreviewRow from "../components/PreviewRow";


const Home = () => {




    return ( 
        <>
            <section className="max-w-6xl mx-auto flex flex-col items-center">
                <h2>Home</h2>
                <Banner />
                <PreviewRow 
                    category={"trending"}
                    searchQuery={"trending/all/day"}
                    additionalQuery={""}
                />
                <PreviewRow 
                    category={"netflix orginals"}
                    searchQuery={"discover/tv"}
                    additionalQuery={"&with_networks=213"}
                />
                <PreviewRow 
                    category={"action"}
                    searchQuery={"/discover/movie"}
                    additionalQuery={"&with_genres=28"}
                />
                <PreviewRow 
                    category={"comedy"}
                    searchQuery={"/discover/movie"}
                    additionalQuery={"&with_genres=35"}
                />
                <PreviewRow 
                    category={"horror"}
                    searchQuery={"/discover/movie"}
                    additionalQuery={"&with_genres=27"}
                />
                <PreviewRow 
                    category={"romance"}
                    searchQuery={"/discover/movie"}
                    additionalQuery={"&with_genres=10749"}
                />
                <PreviewRow 
                    category={"documentaries"}
                    searchQuery={"/discover/movie"}
                    additionalQuery={"&with_genres=99"}
                />
            </section>
        </>
     );
}
 
export default Home;