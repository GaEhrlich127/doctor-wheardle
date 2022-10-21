import {useRouter} from 'next/router';
import { useEffect } from 'react';

const Home = () =>{

  const router = useRouter();
  useEffect(()=>{
    router.push('/game');
  },[])

  return (
    <div>Zoinks! You shouldn't be here, you'll be redirected momentarily. If you don't, click <a href="/game">here</a></div>
  )
}

export default Home;