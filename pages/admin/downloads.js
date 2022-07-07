import Head from 'next/head'
import Image from 'next/image'
import Downloads from '../../components/Downloads/Downloads'
import Navbar from '../../components/Layout/Navbar/Navbar'
import Table from '../../components/Table/Table'
import { Fragment } from 'react'

export default function Admin() {
  return (
    <Fragment>
      <Navbar />
      <div className="content">
        <Downloads></Downloads>
      </div>
    </Fragment>
  )
}
