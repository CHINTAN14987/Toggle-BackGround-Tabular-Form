import {  Modal, Select, Table } from "antd";
import React, {  useEffect, useState } from "react";
import EmployeeForm from "../Form";
import "./table.css";
import { useDispatch, useSelector } from "react-redux";
import { copyFormItem, deleteFormItem, sortTable } from "../../redux/reducer";
import { CopyFilled, DeleteFilled, EditFilled  } from '@ant-design/icons';
import { darkBG, lightBG } from "../../util/config";
import { store } from "../../redux/store";

export default () => {
  const formData=useSelector(state=>state.app.details)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editColumn, setEditColumn] = useState({});
  const [sortSelection, setSortSelection]=useState(null)
  const backGround = useSelector((state) => state.app.bgColor);
  
  
const dispatch=useDispatch()
 

  const deleteHandler =  (value) => {
 dispatch(deleteFormItem(value))
   
  };
const copyHandler=(value)=>{
   dispatch(copyFormItem({data:value}))
}
  const editHandler = (value) => {
    setIsModalOpen(true);
    setEditColumn(value);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const changeHandler=(value)=>{
    setSortSelection(value)
  }
 
  const Sum = formData.reduce((sum, record) => {
   if(record.Phone){
    return ((sum + (record.Age ? +(record?.Age):0))   ); 
   }
  }, 0);
  const Phone = formData.reduce((sum, record) => {
    if(record.Phone){
     return ((sum + (record.Phone ? +(record?.Phone):0))   ); 
    }
   }, 0);
 

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      id: "Name",
    },
    {
      title: "Email",
      dataIndex: "Email",
      id: "Email",
    },
     {
      title: "Gender",
      dataIndex: "Gender",
      id: "Gender",
    },
    {
      title: "Age",
      dataIndex: "Age",
      id: "Age",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      id: "Phone",
    },
    {
      title: "Address",
      dataIndex: "Address",
      id: "Address",
    },
    {
      title: "Domain",
      dataIndex: "Domain",
      id: "Domain",
    },
    {
      title: "Address",
      dataIndex: "address",
      id: "address",
    },
    {
      title: "Percentage",
      dataIndex: "Percentage",
      id: "Percentage",
    },
    {
      title: "Description",
      dataIndex: "Description",
      id: "Description",
    },
    {title:"Actions",
      render: (record) => (
        <div>
          <CopyFilled   onClick={() => {
              copyHandler(record);
            }}/>
           <DeleteFilled   onClick={() => {
            deleteHandler(record.id);
          }}/>
          <EditFilled  onClick={() => {
              editHandler(record);
            }}/>
          {record?.id === editColumn.id && (
            <Modal open={isModalOpen} footer={null} onCancel={handleCancel}   bodyStyle={{minHeight: 550}}>
              <EmployeeForm
                value={record}
                isModalOpen={isModalOpen}
                closeModal={() => {
                  setIsModalOpen(false);
                }}
              />
            </Modal>
          )}
        </div>
      ),
    },
  
  
  ];
  const options=[
    {
      value: "Name",
      label: "Name",
    },
    {
      value: "Age",
      label: "Age",
    },
   
  ];

  useEffect(()=>{
    if(sortSelection){
      dispatch(sortTable(sortSelection))
    }
  },[sortSelection])
  return (
    <div className={`employee-list-container ${backGround? "DarkTableBg":"lightTableBg"}`} style={backGround ? darkBG : lightBG}>
      {formData?.length ? (
        <div>
          <div className="heading-wrapper">
            <span className="heading"> Students Details...</span>
            <Select
              
              name={sortSelection}
              allowClear
              placeholder="Select Sorting of Table"
              onChange={(e) => {
                changeHandler(e);
              }}
              size={"large"}
              options={options}
            />
          </div>
          <div>
         
          </div>
          <Table dataSource={formData} columns={columns} scroll={{ x: 500 }} pagination={false}  summary={() => (
         <Table.Summary fixed>
        <Table.Summary.Row>
       {columns.map((_, Idx)=>{return  <Table.Summary.Cell>{Idx===0? "Sum:-":Idx===3 ? Sum:Idx===4? Phone:""}</Table.Summary.Cell>
       })}
      </Table.Summary.Row>
    </Table.Summary>
         
          
        )}></Table>
        </div>
      ) : (
        <div className="">
          <h3 className="heading-wrapper-none"> No Employees are in the List....</h3>
        </div>
      )}
     {console.log(store.getState())}
    </div>
  );
};


