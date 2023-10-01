import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Field } from 'formik'

const SizeChart = () => {
    const rows =[
        {
            id:1,
            size:"Chest(in)",
            XXS:"28.1 - 32.5",
            XS:"31.5 - 35",
            S:"35 - 37.5",
            M:"37.5-41",
            L:"41 - 44",
            XL:"44 - 48.5",
            XXL:"48.5 - 53.5",
            XXXL:"53.5 - 58"
        },
        {
            id:2,
            size:"Waist (in)",
            XXS:"22.5 - 25.5",
            XS:"25.5 - 29",
            S:"29 - 32",
            M:"32 - 35",
            L:"35 - 38",
            XL:"38 - 43",
            XXL:"43- 47.5",
            XXXL:"47.5 - 52"
        },
        {
            id:3,
            size:"Hip (in)",
            XXS:"28.5 - 31.5",
            XS:"31.5 - 35",
            S:"35 - 37.5",
            M:"37.5 - 41",
            L:"41- 44",
            XL:"44 - 47",
            XXL:"47- 50.5",
            XXXL:"50.5 -53.5"
        },
        {
            id:4,
            size:"Height (in)",
            XXS:`< 5'7"`,
            XS:`5'7" - 6'0" `,
            S:`5'7" - 6'0"`,
            M:`5'7" - 6'0"`,
            L:`5'7" - 6'0"`,
            XL:`5'7" - 6'0"`,
            XXL:`5'7" - 6'0"`,
            XXXL:`5'7" - 6'0"`,
        }
    ];
    const columns =[
        {field:"size",headerName:"Size",flex:1,minWidth:150},
        {field:"XXS",headerName:"XXS",flex:1,minWidth:150},
        {field:"XS",headerName:"XS",flex:1,minWidth:150},
        {field:"S",headerName:"S",flex:1,minWidth:150},
        {field:"M",headerName:"M",flex:1,minWidth:150},
        {field:"L",headerName:"L",flex:1,minWidth:150},
        {field:"XL",headerName:"XL",flex:1,minWidth:150},
        {field:"XXL",headerName:"2XL",flex:1,minWidth:150},
        {field:"XXXL",headerName:"3XL",flex:1,minWidth:150},

    ];

    
  return (
    <div className='size-chart-container'>
        <h1>Size Chart</h1>
        <div className='data-grid-container'>
            <DataGrid 
            rows={rows} 
            columns={columns} 
            initialState={{
                pagination: {
                  paginationModel: {pageSize: 4 },
                },
              }}
              pageSizeOptions={[5, 10]}
            autoHeight
            hideFooter = {true}
            />
        </div>
        <h3>How to Measure</h3>
        <p>
        <strong>CHEST:</strong> <span style={{textAlign: "center"}}>Measure around the fullest part of your
        chest, keeping the measuring tape horizontal.</span><br/><br/>

        <strong>WAIST:</strong> <span style={{textAlign: "center"}}>Measure around the narrowest part
        typically where your body bends side to side,
        keeping the tape horizontal.</span> <br/><br/>

        <strong>HIPS:</strong> <span style={{textAlign: "center"}}>Measure around the fullest part of your hips
        keeping the tape horizontal.</span>
    </p>
    </div>
  )
}

export default SizeChart