import "../index.css";
import axios from "axios";
import moment from "moment";
import { Component } from "react";
import ReactToPrint from "react-to-print";
import { Layout } from "antd";
import PageLayout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { numberWithCommas } from "../utils/format";
import {
  EditOutlined,
  DeleteOutlined,
  PrinterTwoTone,
} from "@ant-design/icons";
import {
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  DatePicker,
  Space,
  Divider,
} from "antd";

const { Content } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const HomePage = () => {
  // inline style settings --------------------------------------------------------------------
  const positive = {
    color: "#00B050",
    float: "right",
    fontSize: "larger",
  };

  const negative = {
    color: "tomato",
    float: "right",
    fontSize: "larger",
  };
  const result = {
    float: "right",
    fontSize: "larger",
    fontWeight: "550",
  };
  // ----------------------------------------------------------------------------------------

  // useState section------------------------------------------------------------------------
  const [open, setOpen1] = useState(false);
  const [period, setPeriod] = useState("7");
  const [editable, setEditable] = useState(null);
  const [reportType, setReportType] = useState("all");
  const [showAntdModal, setShowAntdModal] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [selectedDate, setSelectedate] = useState([]);

  // -----------------------------------------------------------------------------------------

  // Get Data based on filters and perform calculations --------------------------------------
  // this section gets income and expences and calulate mathematical actions (add and deduct)

  const totalIncomeBalance = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);

  const totalExpenseBalance = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2);

  const remainder = (totalIncomeBalance - totalExpenseBalance).toFixed(2);
  // -----------------------------------------------------------------------------------------

  // Cancel Button Handler -------------------------------------------------------------------
  function checkForm(e) {
    if (!window.confirm("Do you want to submit the form?"))
      e.returnValue = false;
  }
  // -----------------------------------------------------------------------------------------

  // Creating table of data ------------------------------------------------------------------
  const type = reportType;
  const columns = [
    {
      title: "Date:",
      dataIndex: "date",
      render: (text) => (
        <span style={{ fontSize: "16px" }}>
          {moment(text).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Type:",
      dataIndex: "type",
    },
    {
      title: "Amount:",
      dataIndex: "amount",
    },
    {
      title: "Description:",
      dataIndex: "description",
    },
    {
      title: "Actions:",
      render: (text, record) => (
        <div>
          <Space size={"large"}>
            <EditOutlined
              style={{ color: "blue", fontSize: "22px" }}
              onClick={() => {
                setEditable(record);
                setShowAntdModal(true);
              }}
            />
            <DeleteOutlined
              style={{ color: "red", fontSize: "22px" }}
              onClick={() => {
                handleDelete(record);
              }}
            />
          </Space>
        </div>
      ),
    },
  ];
  // -----------------------------------------------------------------------------------------

  // useEffects ---Select period, selectedDate, Selectype] ---------------------------------
  // Select period (1 week, 1 month, one year, custome),
  // selectedDate,
  // Select Type (Income or expense)]
  const frequency = period;
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.post("/api/v1/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransaction(res.data);
        console.log(res.data);
      } catch (info) {
        console.log(info);
        message.info("** Tranction Fteching Issue **");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);
  // -----------------------------------------------------------------------------------------

  // delete handler codes---------------------------------------------------------------------
  const handleDelete = async (record) => {
    try {
      await axios.post("/api/v1/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaction Deleted!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      message.error("Unable to delete");
    }
  };
  // ---------------------------------------------------------------------------------------

  // handling transaction form --------------------------------------------------------------
  const handleSubmit = async (values) => {
    try {
      window.location.reload();
      const user = JSON.parse(localStorage.getItem("user"));
      if (editable) {
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload: { ...values, userId: user._id },
          transactionId: editable._id,
        });
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        message.success("Transaction Added Successfully");
      }
      setShowAntdModal(false);
      setEditable(null);
    } catch (info) {
      message.info("Complete the form or Click on X to Cancel");
    }
    window.location.reload();
  };
  // End of handling transaction form--------------------------------------------------------

  // handling printing tables ------------------------------------------------------------
  function printTable(value) {
    if( value === "printPivotTable"){
      let divToPrint = document.getElementById("printPivotTable");
      let newWin = window.open('', '', 'height=700,width=700');
      newWin.document.write(divToPrint.outerHTML);
      newWin.print();
      newWin.close();
    } else{
      let divToPrint = document.getElementById("printTable");
      let newWin = window.open("");
      newWin.document.write(divToPrint.outerHTML);
      newWin.print();
      newWin.close();
    }
  }
  // End of handling table Prints --------------------------------------------------------------
  
  return (
    <PageLayout>
      <Divider />
      <div className="calculationFilterSection">
        <div>
          <button
            className="btn"
            onClick={() => {
              setShowAntdModal(true);
              setOpen1(false);
            }}
          >
            Add a Transaction
          </button>
        </div>

        <Divider type="vertical" />

        <div>
          <h6>Select Report Type (Balance, Income, Expense)</h6>
          <Select
            style={{ padding: "0 8px 4px" }}
            value={type}
            onChange={(values) => setReportType(values)}
          >
            <Select.Option value="all">Balance</Select.Option>
            <Select.Option value="income">Income only</Select.Option>
            <Select.Option value="expense">Expense only</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>

        <Divider type="vertical" />

        <div>
          <h6>Select Period</h6>
          <Select
            style={{ padding: "0 8px 4px" }}
            value={frequency}
            onChange={(values) => setPeriod(values)}
          >
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        
        <Divider type="vertical" />
      
        <div>
          <h6>Print Table</h6>
          <Select
            style={{ padding: "0 8px 4px" }}
            value="Select Print Section"   onChange={(values) => printTable(values)}>
            <Select.Option value="printDataTable">Main Table</Select.Option>
            <Select.Option value="printPivotTable">Analytical Table</Select.Option>
          </Select>
        </div>

        <Divider type="vertical" />

        <div>
          {" "}
          <>
            <table style={{ padding: "0 8px 4px", width:"805px" }}
              className="pivoteTable2"
              id="printPivotTable"
              cellspacing="0"
              cellpadding="0"
            >
              <tbody>
                {/* -------------- Income --------------- */}

                <tr>
                  <td className="alnright">
                    <h5>Your net income for the selected filters:</h5>
                  </td>

                  <td className="alnright">
                    <h5>
                      <span style={positive}>
                        ${numberWithCommas(totalIncomeBalance)}
                      </span>
                    </h5>
                  </td>
                </tr>

                {/* -------------- Expense --------------- */}

                <tr>
                  <td className="alnright">
                    <h5>Your total expense for the selected criteria:</h5>
                  </td>

                  <td className="alnright">
                    <h5>
                      <span style={negative}>
                        ${numberWithCommas(totalExpenseBalance)}
                      </span>
                    </h5>
                  </td>
                </tr>

                {/* -------------- Balance --------------- */}

                <tr>
                  {type === "expense" ? (
                    <>
                      <td className="alnright">
                        <h5 style={result}>
                          Your net expense for the selected filters:
                        </h5>
                      </td>

                      <td className="alnright">
                        <h5>
                          <span style={result}>
                            ${numberWithCommas(remainder)}
                          </span>
                        </h5>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="alnright">
                        <h5 style={result}>
                          Your net income / balance for the selected filters:
                        </h5>
                      </td>

                      <td className="alnright">
                        <h5>
                          <span style={result}>
                            ${numberWithCommas(remainder)}
                          </span>
                        </h5>
                      </td>
                    </>
                  )}
                </tr>

                {/* -------------- End of Balance --------------- */}
              </tbody>
            </table>
          </>
        </div>
      </div>
      <Divider />
        
      <div className="content">
        <Table style={{ padding: "0 8px 4px", width:"2005px" }} columns={columns} id="printTable" dataSource={allTransaction} />
      </div>

      <Modal
        destroyOnClose={true}
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showAntdModal}
        footer={true}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 80, resize: "none" }}
              placeholder="Short description"
            />
          </Form.Item>

          <div className="d-flex justify-content-center">
            <Space>
              <button type="submit" className="btn ">
                {" "}
                Submit
              </button>

              <Form name="theForm" onSubmit="return checkForm(event)">
                <button type="submit" className="btn">
                  {" "}
                  Cancel
                </button>
              </Form>
            </Space>
          </div>
        </Form>
        <Form preserve={false}></Form>
      </Modal>
    </PageLayout>
  );
};

export default HomePage;
