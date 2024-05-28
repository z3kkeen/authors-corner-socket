'use client'
import React, { useEffect, useState } from 'react';
import io, {Socket} from 'socket.io-client';
let socket: Socket;

    export default function Game({ id }: { id: string }) {
      const [msg, setMsg] = useState<string>('');
      useEffect(() => {
        if (!socket || !socket.connected) {
          socket = io();
        }
        socket.emit('join-room', { id:id, msg: msg });
        socket.on('chat', (data) => {
          setMsg(data);
        });
        return () => {
          socket.disconnect();
        };
      }, []);
      return (
        <>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-2xl'><b>Authors' corner!</b></h1>
          <span className=' bg-slate-600 w-20 h-1 my-2'></span>
          <div className='flex flex-col items-center justify-center text-zinc-400'>
            <p><i>a place where online authors</i></p>
            <p><i>can beta read eachother.</i></p>
          </div>

          <div className='mb-10'></div>
          <p className='max-w-[24.5rem] px-5 text-zinc-300 mb-5 border-2 border-zinc-600'>Note: please make sure to only add notes in others' texts, by {'('}putting them within parenticis{')'}, without changing the original text.</p>

          <textarea className='px-2' placeholder='Paste in /write text, and let your fellow authors read through, add suggestions.' cols={40} rows={20} value={msg} onChange={({target})=> socket.emit('chat', { id: id, msg: target.value })} />
        </div>
          
        </>
      );
    }
