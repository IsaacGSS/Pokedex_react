import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { CardPokemon } from './pokeCard'
import { Header } from '../Header'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export const PokedexList = () => {
  const [addPoke, setAddPoke] = useState<number>(150)
  const [pokeLimited, setPokeLimited] = useState<number>(50)
  const [valueName, setValueName] = useState<any>()
  const [idPoke, setIdPoke] = useState([
    {
      data: {
        id: '',
        name: '',
        sprites: { front_default: '' },
        types: [{ type: { name: '' } }]
      }
    }
  ])

  const [isActiveTheTips, setIsActiveTheTips] = useState(false)
  const onclickActive = () => {
    setIsActiveTheTips(!isActiveTheTips)
  }

  const [isActiveLoading, setIsActiveLoading] = useState(false)

  const existenceInThePokeList = idPoke[0].data.id

  let endpoints: string[] = []

  for (
    let i = endpoints.length === 0 ? 1 : endpoints.length;
    i <= addPoke;
    ++i
  ) {
    endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
  }

  useEffect(() => {
    getPoke()

    setIsActiveLoading(true)
  }, [addPoke])

  const getPoke = async () => {
    await axios
      .all(endpoints.map(endpoint => axios.get(endpoint)))
      .then((poke: any) => setIdPoke([...poke]))
  }

  let valorInputPokedex = ''

  const functionScrollInfinit = () => {
    pokeLimited >= addPoke ? setAddPoke(addPoke + 50) : ''
    setPokeLimited(pokeLimited + 25)
  }

  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observe: any = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        functionScrollInfinit()
      }
    })

    if (observerRef.current) {
      observe.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observe.disconnect(observerRef.current)
        setIsActiveLoading(false)
      }
    }
  }, [pokeLimited, addPoke, idPoke])

  return (
    <>
      <Header />
      <main>
        <div className='m-auto flex flex-row justify-center items-center gap-2 '>
          <div className='p-2 flex flex-col gap-2 border-2 border-sky-800 rounded-md'>
            <div className='flex flex-row '>
              <input
                className='px-4 py-1 z-0 -right-3 relative rounded-l-lg bg-opacity-75 bg-white focus:bg-opacity-100 outline-none'
                placeholder='Pikachu ou #25'
                type='text'
                onChange={(e: any) => {
                  valorInputPokedex =
                    e.target.value.substr(0, 1) == '#'
                      ? parseInt(e.target.value.replace(/[^0-9]/g, ''))
                      : e.target.value.toLowerCase()

                  setValueName(valorInputPokedex)
                }}
              />
              <span onClick={onclickActive}>
                <QuestionMarkCircleIcon className='w-8 z-20 right-1 relative bg-yellow-400 rounded-full' />
              </span>
            </div>
            <div
              aria-hidden={isActiveTheTips}
              className='hidden text-center m-auto w-64 p-3 bg-blue-500 bg-opacity-95 rounded-l-3xl rounded-br-3xl text-white
            aria-hidden:flex '
            >
              <p>
                Caso queira fazer a busca pelo numero da Pokedex, Use{' '}
                <strong> # </strong> antes da propria busca
              </p>
            </div>
          </div>
        </div>
        <ul className='flex flex-row flex-wrap m-auto my-10 mx-1 md:m-5  justify-center items-center gap-5 '>
          {valueName
            ? idPoke
                .filter(poke =>
                  typeof valueName === 'string'
                    ? poke.data.name.includes(valueName)
                    : poke.data.id == valueName
                )
                .map((poke, key) => (
                  <CardPokemon
                    key={key}
                    id={poke.data.id}
                    img={poke.data.sprites.front_default}
                    name={poke.data.name}
                    numero={poke.data.id.toString()}
                    pokeType={poke.data.types[0].type.name}
                  />
                ))
            : idPoke
                .slice(0, pokeLimited)
                .map((poke, key) => (
                  <CardPokemon
                    key={key}
                    id={poke.data.id}
                    img={poke.data.sprites.front_default}
                    name={poke.data.name}
                    numero={poke.data.id.toString()}
                    pokeType={poke.data.types[0].type.name}
                  />
                ))}
        </ul>

        {existenceInThePokeList ? (
          <div
            className='w-full flex justify-center items-center bg-transparent'
            ref={observerRef}
            id='sentinelas'
          >
            {isActiveLoading ? (
              <div className='bg-transparent animate-pulse'>
                <Image
                  className='md:w-12 w-6'
                  src='/Pokeboll.png'
                  alt='loading'
                  width={50}
                  height={50}
                  unoptimized
                />
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </main>
    </>
  )
}
