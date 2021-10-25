import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router";

import PageTitle from "../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";

function Cards() {
  const [customer, setCustomer] = useState("");
  const [consignee, setConsignee] = useState("");
  const [status, setStatus] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [trackingNo, setTrackingNo] = useState("");
  const [date, setDate] = useState("");

  let history = useHistory();

  useEffect(() => {
    let newData = JSON.parse(localStorage.getItem("data"));
    setCustomer(newData.customer);
    setConsignee(newData.consignee);
    setStatus(newData.status);
    setTrackingNo(newData.trackingNo);
    setOrderNo(newData.orderNo);
    setDate(newData.date);
  }, []);

  const updateAPIData = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3003/shipments/${orderNo}`, {
        customer,
        consignee,
        status,
        orderNo,
        trackingNo,
        date,
      })
      .then(() => {
        history.push("/app/dashboard");
      })
      .then(localStorage.clear());
  };

  return (
    <>
      <PageTitle>Edit Shipment Details</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form className="bg-dark shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Label>
            <span>Customer Name</span>
            <Input
              className="mt-1"
              placeholder="Customer Name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </Label>

          <Label className="mt-4">
            <span>Consignee</span>
            <Input
              className="mt-1"
              placeholder="Consignee Name"
              value={consignee}
              onChange={(e) => setConsignee(e.target.value)}
            />
          </Label>

          <Label className="mt-4">
            <span>Order No</span>
            <Input
              className="mt-1"
              placeholder="Order No Name"
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
            />
          </Label>

          <Label className="mt-4">
            <span>Tracking No</span>
            <Input
              className="mt-1"
              placeholder="Tracking No Name"
              value={trackingNo}
              onChange={(e) => setTrackingNo(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Date</span>
            <Input
              className="mt-1"
              placeholder="Date Name"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Label>

          <div className="mt-4">
            <Label>Status Type</Label>
            <div
              className="mt-2"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <Label radio>
                <Input type="radio" value="Shipped" name="statusType" />
                <span className="ml-2">Shipped</span>
              </Label>
              <Label className="ml-6" radio>
                <Input type="radio" value="In Transit" name="statusType" />
                <span className="ml-2">In Transit</span>
              </Label>
              <Label className="ml-6" radio>
                <Input type="radio" value="Delivered" name="statusType" />
                <span className="ml-2">Deliverd</span>
              </Label>
            </div>
          </div>

          <Label className="mt-6" check>
            <Button onClick={(e) => updateAPIData(e)} type="submit">
              Update
            </Button>
          </Label>
        </form>
      </div>
    </>
  );
}

export default Cards;
