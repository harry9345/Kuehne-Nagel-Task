import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Pagination,
} from "@windmill/react-ui";

import response from "../utils/demo/tableData";
// make a copy of the data, for the second table
const response2 = response.concat([]);

function Tables() {
  // setup pages control for every table
  const [pageTable2, setPageTable2] = useState(1);

  // setup data for every table
  const [dataTable2, setDataTable2] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(
      response2.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2]);

  return (
    <>
      <PageTitle>Tables</PageTitle>

      <SectionTitle>Table with actions</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Customer</TableCell>
              <TableCell>Consignee</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tracking No</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((shipment, i) => (
              <TableRow key={i}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Tables;
