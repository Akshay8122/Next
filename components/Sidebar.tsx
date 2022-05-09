import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'

function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  // console.log('you picked plalist', playlistId)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        //@ts-ignore
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  console.log(playlists)

  return (
    <div className="h-screen overflow-y-scroll border-r border-gray-900 p-5  text-sm text-gray-500  scrollbar-hide">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => {
            signOut()
          }}
        >
          <HomeIcon className="h-5 w-5" />
          <p> Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p> Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        <hr className="border-t[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p> Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p> Your episodes</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Library</p>
        </button>
        <hr className="border-t[0.1px] border-gray-900" />

        {/* Playlist... */}

        {playlists.map((items: any) => (
          <p
            key={items.id}
            onClick={() => setPlaylistId(items.id)}
            className="cursor-pointer hover:text-white"
          >
            {items.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
