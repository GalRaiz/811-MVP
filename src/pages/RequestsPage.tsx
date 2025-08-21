import React from "react";
import TableOrCards, { IFilterOption } from "../components/storybook/ViewModes/TableOrCards";
import "./RequestsPage.scss";
import { assistanceRequests } from "../data/requestsData";
import { IRequest } from "../store/types";
import PageHeader from "../components/storybook/NavBar/PageHeade";
import { getAssistanceTypeOptions, getAssistanceTypeLabel, getAssistanceSubTypeLabel, getSubTypeOptions } from "../utils/assistanceTypeUtils";

const RequestsPage: React.FC = () => {
  const filterOptions: IFilterOption[] = [
    { 
      key: "requestDetails.requestType",
      label: "סוג הבקשה",
      name: "requestDetails.requestType",
      type: "select",
      options: getAssistanceTypeOptions(),
    },
    {
      key: "requestDetails.requestSubType",
      label: "תת-סוג",
      name: "requestDetails.requestSubType",
      type: "multi-select",
      dependsOn: "requestDetails.requestType",
      getOptions: (selectedValues: Record<string, string>) => {
        const selectedType = selectedValues["requestDetails.requestType"];
        if (selectedType) {
          return getSubTypeOptions(selectedType);
        }
        return [];
      },
    },
    {
      key: "requesterDetails.requesterName",
      label: "מי צריך עזרה",
      name: "requesterDetails.requesterName",
      type: "text",
    },
  ];

  const cardRenderer = {
    title: (item: IRequest) => item.requestDetails.requestName,
    description: (item: IRequest) => item.requestDetails.requestDescription || "No description available",
    imageUrl: (item: IRequest) => item.requestDetails.requestImage || undefined,
  };

  return (
    <div>
      <PageHeader title="כל הבקשות" />
      <TableOrCards<IRequest>
        data={assistanceRequests}
        columns={[
          {
            label: "שם הבקשה",
            render: (row) => row.requestDetails.requestName,
          },
          {label: "מספר סידורי-id", render: (row) => row.id},
          {
            label: "סוג הבקשה",
            render: (row) => getAssistanceTypeLabel(row.requestDetails.requestType),
          },
        ]}
        searchPlaceholder="חפש בכל השדות..."
        filterOptions={filterOptions}
        cardRenderer={cardRenderer}
        panelRenderer={(row) => [
          { label: "שם הבקשה", value: row.requestDetails.requestName || "" },
          { label: "סוג הבקשה", value: getAssistanceTypeLabel(row.requestDetails.requestType) },
          { label: "תת-סוג", value: row.requestDetails.requestSubType?.map(subType => getAssistanceSubTypeLabel(subType)).join(", ") || "לא צוין" },
          { label: "תיאור הבקשה", value: row.requestDetails.requestDescription || "No description available" },
          { label: "מי צריך עזרה", value: row.requesterDetails.requesterName || "" },
          { label: "טלפון", value: row.requesterDetails.phone || "" },
          { label: "עיר", value: row.requesterDetails.city || "" },
          { label: "מחוז", value: row.requesterDetails.district || "" },
        ]}
        defaultViewMode="table"
        showViewToggle={true}
      />
    </div>
  );
};

export default RequestsPage;

