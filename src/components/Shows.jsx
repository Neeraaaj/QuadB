import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Shows = () => {
    const [shows, setShows] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const callFetch = async () => {
        const res = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await res.json();
        setShows(data);
    };

    useEffect(() => {
        callFetch();
    }, []);

    const handleGenreClick = (genre) => {
        setSelectedGenres((prevGenres) => {
            if (prevGenres.includes(genre)) {
                return prevGenres.filter((g) => g !== genre);
            } else {
                return [...prevGenres, genre];
            }
        });
    };

    const filterShowsByGenre = (show) => {
        if (selectedGenres.length === 0) {
            return true;
        }
        return show.show.genres.some((genre) => selectedGenres.includes(genre));
    };

    return (
        <div className='bg-gray-200'>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <header className="text-center">
                        <h2 className="text-5xl font-extrabold text-red-500">
                            All Tv Shows
                        </h2>
                        <p className="mx-auto mt-4 max-w-md text-gray-500">
                            Get personal recommendations for all your favorite streaming services. We’ll show you where to watch movies, TV shows & sports.
                        </p>
                    </header>
                    <div className="flex justify-center mt-4 space-x-4">
                        <button
                            onClick={() => handleGenreClick('Drama')}
                            className={`px-4 py-2 rounded-md ${selectedGenres.includes('Drama') ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        >
                            Drama
                        </button>
                        <button
                            onClick={() => handleGenreClick('Comedy')}
                            className={`px-4 py-2 rounded-md ${selectedGenres.includes('Comedy') ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        >
                            Comedy
                        </button>
                    </div>
                    <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                        {shows.map((data, index) => {
                            const imageURL = data.show.image?.medium;
                            if (!filterShowsByGenre(data)) {
                                return null; 
                            }
                            return (
                                <Link to={`/shows/${data.show?.id}`} key={index}>
                                    <ul className="mt-8 flex flex-row rounded-xl w-fit">
                                        <li>
                                            <a href="#" className="group block overflow-hidden rounded-3xl">
                                                <img
                                                    src={data.show?.name === 'All Stars' ? "https://m.media-amazon.com/images/S/pv-target-images/cb93f53b9b6888349851126da5aecc9343a6beee7a9ec235a4854a9d1bc5484d.jpg" : imageURL}
                                                    alt={data.network?.name}
                                                    className="w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                                                />
                                                <div className="relative bg-gray-900 pt-3 p-4 rounded-xl m-1">
                                                    <div className='flex justify-between gap-2'>
                                                        <h3 className="text-xs text-white group-hover:underline group-hover:underline-offset-4 grid grid-cols-1">
                                                            Genres: {`${data.show?.genres}`}
                                                        </h3>
                                                        <p className='text-white text-xs'>Premiered: {data.show?.premiered}</p>
                                                    </div>
                                                    <p className="mt-2">
                                                        <span className="tracking-wider text-white text-2xl font-bold flex"> {data.show?.name} </span>
                                                        <span className="tracking-wider text-white text-sm font-bold flex"> Language: {data.show?.language} </span>
                                                        <span className="tracking-wider text-red-600 text-sm font-bold flex"> Average Rating: {data.show.rating?.average ? data.show.rating?.average : "Not available"} </span>
                                                    </p>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shows;
