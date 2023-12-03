export function DefaultTable({slots}) {

  return (

      <table className="w-full table-auto text-center">
        <thead>
          <tr>
            <th className="border-b w-[5%] border-blue-gray-100 bg-blue-gray-50 p-4">SL NO</th>
            <th className="border-b w-[20%] border-blue-gray-100 bg-blue-gray-50 p-4">DATE</th>
            <th className="border-b w-[75%] border-blue-gray-100 bg-blue-gray-50 p-4 ">SLOTS</th>
          </tr>
        </thead>
        <tbody>
          { slots.map((ele, i) => (<tr key={i}>
            <td>{i+1}</td>
            <td>{new Date(ele?._id).toLocaleDateString()}</td>
            <td>{ele?.slotData?.map((elem,i) => (<h2  className="border inline-block border-orange-600 rounded m-1 " key={i}>{elem?.slot?.time}</h2 >))}</td>
          </tr>))}
        </tbody> 
      </table>
  )
  
}