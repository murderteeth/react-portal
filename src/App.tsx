import React, { useMemo, useState } from 'react'
import {RiDoorOpenFill, RiDoorClosedFill} from 'react-icons/ri'

export default function App() {
  const PARTICLE_COUNT = 200
  const rRange = (min: number, max: number) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min))
  const [hover, setHover] = useState(false)
  const [press, setPress] = useState(false)
  const [clicked, setClicked] = useState(false)
  const palletStride = 3
  const pallet = ['#78350f', '#f59e0b', '#fcd34d', '#831843', '#ec4899', '#f9a8d4', '#1e3a8a', '#3b82f6', '#93c5fd']
  const palletSlots = pallet.length / palletStride

  const particles = useMemo(() => {
    // color: pallet[Math.floor(Math.random() * pallet.length)],
    return Array(PARTICLE_COUNT).fill({}).map((o, i) => { 
      return ({
      time: `${1 + 3 * Math.random()}s`,
      size: `${rRange(4, 12)}px`,
      borderRadius: Math.random() > .5 ? '50%' : '0%',
      color: pallet[Math.floor(palletStride * palletSlots * i / PARTICLE_COUNT) + Math.floor(2 * Math.random())],
      rotate: `${rRange(0, 90)}deg`,
      scaleEnd: (100 - rRange(0, 90)) / 100,
      animationDelay: `-${rRange(0, 2000)}ms`
    })})
  }, [])

  return <div className={'w-full h-full flex flex-col items-center justify-center gap-16'}>
    <h1 className={`
      font-bold text-8xl
      bg-clip-text text-transparent 
      bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500
      `}>{'portal'}</h1>

    <div className={'relative w-96 h-96 flex items-center justify-center'}>
      <button className={`
        group absolute z-10 w-[120px] h-[120px]
        flex items-center justify-center
        bg-zinc-900 hover:scale-110
        active:transform active:scale-100
        rounded-full cursor-pointer 
        transition duration-200`}
        onClick={() => setClicked(current => !current)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}>
          {!clicked && <RiDoorClosedFill className={'text-amber-600 text-5xl group-hover:text-amber-400 transition duration-200'} />}
          {clicked && <RiDoorOpenFill className={'text-amber-600 text-5xl group-hover:text-amber-400 transition duration-200'} />}
      </button>

      <div className={'w-full h-full flex items-center justify-center portal-ring'}>
        {particles.map((particle: any, i: number) => 
        <div key={i} className={'absolute'} 
          style={{transform: `rotate(${i * 360 / PARTICLE_COUNT}deg) translateX(60px)`}}>
          <div className={`portal-particle`} 
            style={{
              ['--time' as any]: particle.time,
              width: particle.size,
              height: particle.size,
              borderRadius: particle.borderRadius,
              backgroundColor: particle.color,
              ['--rotate' as any]: particle.rotate,
              ['--scale-end' as any]: clicked ? 4 : hover || press ? (press ? .35 : particle.scaleEnd) : particle.scaleEnd,
              animationDelay:  particle.animationDelay
            }} />
        </div>)}
      </div>
    </div>
  </div>
}