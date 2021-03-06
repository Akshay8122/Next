import { signOut, useSession } from 'next-auth/react'
import { MouseEventHandler, useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/Songs'

const colors: string[] | any = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState<any>(playlistState)

  console.log('playlist', playlist)

  useEffect(() => setColor(shuffle(colors).pop()), [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log('something went wrong', err))
  }, [spotifyApi, playlistId])
  console.log(playlistId)

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-2 pr-5 text-white opacity-90 hover:opacity-80"
          onClick={signOut as MouseEventHandler<HTMLDivElement>}
        >
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user?.image as string}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
        </div>
      </header>

      <section
        className={`flex h-80 w-full items-end space-x-7 bg-gradient-to-b p-8 ${color} to-black text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />

        <div>
          <p>PLAYLIST</p>
          <h1 className="x1:text-5xl font text-2xl md:text-3xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
