import React from 'react'
import DataTable from 'react-data-table-component';

function CustomDatatable(props) {
  return (
    <>
      <DataTable
        columns={props.columns}
        data={props.data}
        pagination
        title={props.title}
        fixedHeader
        fixedHeaderScrollHeight='400px'
        highlightOnHover
        subHeader
        subHeaderComponent={props.searchdata}
        tableStyle={{ minWidth: '100rem' }}
      />
    </>
  )
}

export default CustomDatatable;