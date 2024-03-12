import React from "react";

function Table(props) {
    return (
           <>
            <table className="table table-striped datatable">
                <thead>
                    <tr>
                        {props.heads.map((item, key) => {
                            return <th key = {key}>{item}</th>
                        })}

                    </tr>
                </thead>

                <tbody>
                    {props.bodies.map((item1, key1) => {
                        return <tr key={key1}>
                            {props.heads.map((header, key3) => {
                                return <td key={key3}>{item1[header]}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>

           </>
   
    );

}

export default Table;