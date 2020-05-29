import * as React from "react";
import styled from "styled-components";
import MaterialTable from "material-table";
import Search from '@material-ui/icons/Search';
import Edit from '@material-ui/icons/Edit';
import { forwardRef } from 'react';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Clear from '@material-ui/icons/Clear';
import Modal from '../Components/Modal'
import AddPartnerModel from '../Modals/AddPartnerModal'
import EditPartnerModal from '../Modals/EditPartnerModal'
const DetailsWrapper = styled.div`
margin-left:23rem;
margin-right:4rem;
margin-top:1rem;


.topDiv{

button{
    float:right;
    margin:0rem;
    margin-bottom: 2rem;
    border-radius:1rem;
    margin-top: 0.5rem;
    padding: 10px;
    background-color: #D4AE69;
    color: white;
    box-shadow: 0 9px 15px -9px #333;
    border: none;
    margin-right: 3rem;
    outline:none;
    font-size:18px;
}}
`
export default class PartnerDetails extends React.Component {
    state = {
        addPartnerModal: false,
        editPartnerModal: true,
        icon: null,
        index: "0",
    }
    //  tableIcons=() => {
    //     Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    //     Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    //     Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    //     ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    // };
    render() {
        return (
            <DetailsWrapper>
                <Modal
                 onClose={''}
                open={this.state.addPartnerModal}
                >
                   <AddPartnerModel
                   onAuthorize={()=>
                       this.setState({
                           addPartnerModal: false,
                       })
                   }
                   />
                </Modal>

                <Modal
                 onClose={''}
                open={this.state.editPartnerModal}
                >
                   <EditPartnerModal
                   onAuthorize={()=>
                       this.setState({
                           editPartnerModal: false,
                       })
                   }
                   />
                </Modal>

                 <div className="topDiv">
                {/* <h1>Users</h1> */}
                <button onClick={() => {
                    this.setState({
                        addPartnerModal : true,
                    })
                   }}>+ Add New Partner</button>
            </div>
            <div className="table">
                <MaterialTable
                
                    style={{
                        //  display: "inline-block",
                        // zIndex:"0",
                         position: "inherit",
                        fontSize:"13px"
                        // fontFamily: '"Georgia", "Times New Roman", "Times", serif'
                    }}
                    // icons ={this.tableIcons}

                    title="Users"

                    columns={[
                        {
                            title: 'Partner Id', field: 'PartnerId',
                            cellStyle: {
                                border: 'solid #f2f3f6 3px',
                            },

                        },
                        {
                            title: 'Address', field: 'address',
                            cellStyle: {
                                border: 'solid #f2f3f6 3px',
                            },
                        },
                        {
                            title: 'Contact Person', field: 'contactPerson',
                            cellStyle: {
                                border: 'solid #f2f3f6 3px',
                            },
                            // type: 'numeric'
                        },
                        {
                            title: 'Email Id', field: 'EmailId',
                            cellStyle: {
                                border: 'solid #f2f3f6 3px',
                            },
                        },
                        {
                            title: 'Mobile No', field: 'MobileNo',
                            cellStyle: {
                                border: 'solid #f2f3f6 3px',
                            },
                        },
                        {
                            title: 'Short Code', field: 'ShortCode',
                            cellStyle: {
                                border: 'solid #f2f3f6 3px',
                            },
                        }

                    ]}
                    data={[
                        {
                            PartnerId: '1', address: 'india', contactPerson: 'modi',
                            EmailId: 'ModiR@india', MobileNo: '999', ShortCode: 'dev'
                        },
                        {
                            PartnerId: '2', address: 'maha', contactPerson: 'thakare',
                            EmailId: 'thakare@india', MobileNo: '000', ShortCode: 'cm'
                        },
                        {
                            PartnerId: '3', address: 'maha', contactPerson: 'thakare',
                            EmailId: 'thakare@india', MobileNo: '000', ShortCode: 'cm'
                        },
                    ]}
                    // actions={[
                    //     {
                    //         var icon: this.tableIcons.Edit,
                    //         tooltip: 'Edit User',
                    //         onClick: (event, rowData) => {
                    //             setEditPartnerModal(true)
                    //             // editData(rowData)
                    //         }
                    //     },
                     
                    //     rowData => ({
                    //         icon: tableIcons.Delete,
                    //         tooltip: 'Delete User',
                    //         onClick: (event, rowData) => {
                    //             console.log(rowData)
                    //         }
                    //         // eslint-disable-next-line no-restricted-globals
                    //         //   confirm("You want to delete " + rowData.name)}
                    //     })
                    // ]}
                    options={{
                        search: true,
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#fff',
                            border: 'solid #f2f3f6 3px',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            position:'inherit',
                        },
                        rowStyle: {
                            backgroundColor: '#fff',
                            border: ' #f2f3f6 1.5px',
                            fontSize: '15px',
                            fontWeight: 'bold',
                        },
                    }}
                />
            </div>
            </DetailsWrapper>

        )
    }
}