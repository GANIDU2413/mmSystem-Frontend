
import { Checkbox } from '@mui/material'
import './dataTable.css';


export default function DataTable() {
  return (
    <center>
    <div style={{paddingTop:'65px',width:"95%"}}>
        <table className="table table-striped">
  <thead>
    <tr>
        <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8'}}>Student Results</th>
    </tr>
    <tr>
      <th scope="col">Select</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
    
  </thead>
  <tbody>
    <tr>
      <td scope="row">1 <Checkbox></Checkbox> </td>

      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td scope="row">1 <Checkbox></Checkbox> </td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td scope="row">1 <Checkbox></Checkbox> </td>

      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td scope="row">1 <Checkbox></Checkbox> </td>

      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td scope="row">1 <Checkbox></Checkbox> </td>

      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td scope="row">1 <Checkbox></Checkbox> </td>

      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td scope="row">1 <Checkbox></Checkbox> </td>

      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td scope="row">1 <Checkbox></Checkbox> </td>

      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td scope="row">1 <Checkbox></Checkbox> </td>

      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>

  </tbody>
</table>

    <div className='right-aligned-div'>
        <button type="button" className="btn btn-outline-primary">Update Medical</button>&nbsp;&nbsp;
        <button type="button" className="btn btn-outline-primary">Approve</button>
    </div>
    </div>
    </center>
  )
}
