import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {firestore} from '../lib/firebase'
import { doc, getDoc } from "firebase/firestore";
import {useEffect, useState} from 'react'
import Auth from "../components/Auth";

const Home = () =>{

  return (
    <Auth />
  )
}

export default Home;