import React from "react";
import Table from "../components/storybook/Table/Table";
import "./RequestsPage.scss";
import { assistanceRequests } from "../data/requestsData";
import { IRequest } from "../store/types";
import PageHeader from "../components/storybook/NavBar/PageHeade";

const RequestsPage: React.FC = () => {
  return (
    <div>
      <PageHeader title="כל הבקשות" />
      <Table<IRequest>
        data={assistanceRequests}
        columns={[
          {
            label: "Name",
            render: (row) => row.requestDetails.requestName,
          },
          {
            label: "Type",
            render: (row) => row.requestDetails.requestType,
          },
        ]}
        searchField="requestDetails.requestName"
        searchPlaceholder="Search request names..."
        filterOptions={[
          {
            key: "requestDetails.requestType",
            label: "Request Type",
            type: "select",
            options: [
              { value: "מזון", label: "Food" },
              { value: "לוגיסטיקה", label: "Logistics" },
              { value: "בריאות", label: "Health" },
              { value: "ציוד", label: "Equipment" },
              { value: "תמיכה משפחתית", label: "Family Support" },
            ],
          },
          {
            key: "requesterDetails.requesterName",
            label: "Requester Name",
            type: "text",
          },
        ]}
        panelRenderer={(row) => [
          { label: "Name", value: row.requestDetails.requestName },
          { label: "Type", value: row.requestDetails.requestType },
          { label: "Description", value: row.requestDetails.requestDescription || "No description available" },
          { label: "Requester", value: row.requesterDetails.requesterName },
        ]}
      />
    </div>
  );
};

export default RequestsPage;

