import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../../components/Layout/Navbar/Navbar'
import Table from '../../components/Table/Table'
import { Fragment } from 'react'

export default function TableName() {
  return (
    <Fragment>
      <Navbar />
      <div className="content">
        <Table />
      </div>
    </Fragment>
  )
}
