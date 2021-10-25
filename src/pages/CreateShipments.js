import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { Input, Label, Button } from "@windmill/react-ui";

function Create() {
  const [customer, setCustomer] = useState("");
  const [consignee, setConsignee] = useState("");
  const [status, setStatus] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [trackingNo, setTrackingNo] = useState("");
  const [date, setDate] = useState("");

  let history = useHistory();

  const postData = (e) => {
    e.preventDefault();
    axios

      .post("http://localhost:3003/shipments", {
        customer,
        consignee,
        status,
        orderNo,
        trackingNo,
        date,
      })
      .then(() => {
        history.push("/app/dashboard");
      });
  };

  return (
    <>
      <PageTitle>Create Shipment</PageTitle>

      <SectionTitle>New shipment</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form className="bg-dark shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Label>
            <span>Customer Name</span>
            <Input
              className="mt-1"
              placeholder="Customer Name"
              onChange={(e) => setCustomer(e.target.value)}
            />
          </Label>

          <Label className="mt-4">
            <span>Consignee</span>
            <Input
              className="mt-1"
              placeholder="Consignee"
              onChange={(e) => setConsignee(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Order No</span>
            <Input
              className="mt-1"
              placeholder="Order No"
              onChange={(e) => setOrderNo(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Tracking No</span>
            <Input
              className="mt-1"
              placeholder="tracking No"
              onChange={(e) => setTrackingNo(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Date</span>
            <Input
              className="mt-1"
              placeholder="Date"
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
              <Label disabled className="ml-6" radio>
                <Input
                  disabled
                  type="radio"
                  value="Delivered"
                  name="statusType"
                />
                <span className="ml-2">Delivered</span>
              </Label>
            </div>
          </div>

          <Label className="mt-6" check>
            <Button onClick={(e) => postData(e)} type="submit" size="larger">
              Add{" "}
            </Button>
          </Label>
        </form>
      </div>
    </>
  );
}

export default Create;
