import Image from 'next/image'
import pokeIcon from '../src/assets/pokeicon.png'
export const Header = () => {
  return (
    <header>
      <Image
        src={pokeIcon}
        alt='icone pokemon'
        priority
        className='w-1/2 m-auto'
      />
    </header>
  )
}
