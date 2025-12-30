import { Navbar } from '@shared/components'

function App() {
    return (
        <>
            <div className="">
                <Navbar />
                <h1 className="glowing-text">React + Typescript + Tailwind (Template)</h1>
                <p className="text-center text-3xl">MODE:{import.meta.env.VITE_ENV}</p>
            </div>
        </>
    )
}

export default App
