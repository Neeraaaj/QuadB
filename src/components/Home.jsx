import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Binge-Worthy Bliss: Immerse Yourself in QuadB's Fines
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Learn More
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
        to={"/shows"}
          className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
        >
          Get Started
        </Link>
      </div>
    </div>
  </div>
</section>
  )
}

export default Home