import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const Show = () => {

    const [shows, setShows] = useState([]);
    const {id} = useParams();
    const show = shows.filter(item => item.show?.id === Number(id))
    console.log(show)

    const callFetch = async () => {
        const res = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await res.json();
        setShows(data);
    };

    useEffect(() => {
        callFetch();
    }, []);

    const removeHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    };
  return (
    <div className='w-screen h-screen bg-gray-100'>
        {show.map((data, index) => {
            const cleanedSummary = removeHtmlTags(data.show?.summary);
            return(
                <div className='w-screen flex flex-row'>
                    <div className='rounded mt-5 m-5'>
                        <img src={data.show.image?.medium} className='w-[fit-content] h-[fit-content] rounded-2xl mt-20' />
                    </div>

                    <div className='m-10 bg-white rounded-2xl'>
                        <h1 className='text-5xl font-extrabold text-center'>{data.show?.name}</h1>
                        <p className='text-sm m-10'>{cleanedSummary}</p>
                        <p className='text-sm m-10 text-red-600 flex flex-col'>Average Rating: {data.show.rating?.average}
                            <a className='text-sm mt-2 text-gray-400' href={data.show?.url} target='_blank'>watch the show</a>
                            <p>Category: {data.show?.genres + ' '}</p>
                            <p>Country: {data.show.network.country?.name + ' '}</p>
                        </p>
                    </div>
                </div>
            )
        })}
        <Link to={"/shows"}>
            <button className='bg-red-500 text-white p-2 rounded-xl flex justify-center mx-auto'>Go Back</button>
        </Link>
    </div>
  )
}

export default Show