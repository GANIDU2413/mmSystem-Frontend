import React from 'react'
import * as styles from './DataTable.module.css'
import { ALL } from 'dns'

export default function DataTable() {
  return (
    <center>
    <div style={{paddingTop:'65px',width:"95%"}}>
        <table className="table table-striped">
  <thead>
    <tr>
        <th colSpan={100} style={{textAlign:"center"}}>Student Results</th>
    </tr>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    </div>
    </center>
  )
}
