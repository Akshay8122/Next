import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../atoms/songAtom'
import useSpotify from './useSpotify'

function useSongInfo() {
  const spotifyApi = useSpotify()
  const [currentIdTrack, setCurrenTrackId] =
    useRecoilState<null>(currentTrackIdState)
  const [songInfo, setSongInfo] = useState<null>(null)

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}?device_id="+this._device_id"`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())
        setSongInfo(trackInfo)
      }
    }
    fetchSongInfo()
  }, [currentIdTrack, spotifyApi])

  return songInfo
}

export default useSongInfo
