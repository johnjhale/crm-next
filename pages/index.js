import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Layout/Navbar/Navbar'
import Table from '../components/Table/Table'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <div className="content">
        <Table />
      </div>
    </Fragment>
  )
}
