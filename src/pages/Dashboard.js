import React, { useState, useEffect } from "react";

import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";

import { Link } from "react-router-dom";
import {
  ChatIcon,
  CartIcon,
  MoneyIcon,
  PeopleIcon,
  EditIcon,
  TrashIcon,
} from "../icons";
import RoundIcon from "../components/RoundIcon";

import axios from "axios";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Badge,
  Button,
} from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";

function Dashboard() {
  const [response, setResponse] = useState([]);

  const getData = () => {
    axios.get("http://localhost:3003/shipments").then((res) => {
      setResponse(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const setData = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  const onDelete = (orderNo) => {
    axios.delete(`http://localhost:3003/shipments/${orderNo}`).then(() => {
      getData();
    });
  };

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Shipments" value={response.length}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Delivered " value="6,760">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-700 dark:bg-green-700"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="In Transit " value="376">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-orange-600  dark:bg-orange-600 "
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Shipped" value="35">
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-purple-600 dark:bg-purple-600"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Customer</TableCell>
              <TableCell>Consignee</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tracking No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {response.map((shipment) => (
              <TableRow key={shipment.orderNo}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <p className="font-semibold">{shipment.customer}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {shipment.consignee}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      shipment.status === "Delivered"
                        ? "success"
                        : shipment.status === "Shipped"
                        ? "primary"
                        : "warning"
                    }
                  >
                    {shipment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {shipment.trackingNo}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{shipment.date}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to="/app/update">
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        onClick={() => setData(shipment)}
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => onDelete(shipment.orderNo)}
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Dashboard;
