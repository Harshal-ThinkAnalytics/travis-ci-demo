import React, { useState } from 'react';
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useHistory } from "react-router-dom";
import DialogShow from '../Components/DialogShow'


interface Props {
    data: any;
    columns:any;
    title:string;
    setDialog:any;
}


const tableIcons = {
    Add: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref:React.Ref<SVGSVGElement>) => <ViewColumn {...props} ref={ref} />)
  };

const Table:React.FunctionComponent<Props>=(props)=>{
    const history = useHistory();
    const [dialog,setDialog]=useState(false)
    const changePath=(title:string,rowData:any)=>{
        history.push('/Edit'+title,rowData)
    }
    return (
            <MaterialTable
          columns={props.columns}
          icons={tableIcons}
          data={props.data}
          title={props.title}
          style={{
            display: "inline-block",
            overflowX:'scroll',
           // zIndex:"0",
           //  position: "inherit",
           fontSize:"13px"
           // fontFamily: '"Georgia", "Times New Roman", "Times", serif'
       }}
       actions={[
        {
            icon: () => <Edit />,
            tooltip: 'Edit User',
            onClick: (event, rowData) => {
                console.log(rowData)
                changePath(props.title,rowData)
            }
        },
        {
          icon: () => <DeleteOutline />,
          tooltip: 'Delete User',
          onClick: (event, rowData) => props.setDialog(rowData)
        }
        
      ]}
       options={{
        search: true,
        actionsColumnIndex: -1,
        headerStyle: {
            backgroundColor: '#fff',
            border: 'solid #f2f3f6 3px',
            fontSize: '15px',
            fontWeight: 'bold',
            position:'inherit'
        },
        rowStyle: {
            backgroundColor: '#fff',
            border: ' #f2f3f6 1.5px',
            fontSize: '15px',
            fontWeight: 'bold',
        },
    }}
        />
        )
    }

export default Table;