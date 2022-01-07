import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {firestore} from '../lib/firebase'
import { doc, getDoc } from "firebase/firestore";
import {useEffect, useState} from 'react'
import Game from "../components/Game";

const Home = () =>{

  return (
    <Game />
  )
}

export default Home;