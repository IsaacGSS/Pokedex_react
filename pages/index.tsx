import { Seo } from '../components/common/Seo'
import { PokedexList } from '../components/pokeList/pokeList'
import { HomePage } from '../components/HomePage/homePage'

export default function Index() {
  return (
    <>
      <Seo title='PokeDex' />
      <main className='min-h-screen h-full bg-sky-500'>
        <PokedexList />

        {/* <HomePage /> */}

        <footer className='flex justify-center p-14 font-roboto'>
          <p>em desenvolvimento 🚧 por Isaac S. Silva...</p>
        </footer>
      </main>
    </>
  )
}
