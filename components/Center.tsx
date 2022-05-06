import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import {shuffle} from "lodash";

const colors:any = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500', 
];

function Center() {
  const { data: session } = useSession();
  const [color,setColor] = useState(null);

useEffect( () => {
  setColor(shuffle(colors).pop());
},[])

  return (
    <div className="flex flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-red-300 p-2 pr-5 opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user?.image as string}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
        </div>
      </header>

      <section
        className={`padding-8 flex h-80 w-full items-end space-x-7 bg-gradient-to-b ${color} to-black text-white`}
      >
        <h1>hello</h1>
      </section>
    </div>
  )
}

export default Center
