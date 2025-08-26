import React from 'react';
import TableOrCards, {
  IFilterOption,
} from '../components/storybook/ViewModes/TableOrCards';
import './RequestsPage.scss';
import { assistanceRequests } from '../data/requestsData';
import { IRequest } from '../store/types';
import PageHeader from '../components/storybook/NavBar/PageHeader';
import {
  getAssistanceTypeOptions,
  getAssistanceTypeLabel,
  getAssistanceSubTypeLabel,
  getSubTypeOptions,
} from '../utils/assistanceTypeUtils';

const RequestsPage: React.FC = () => {
  const filterOptions: IFilterOption[] = [
    {
      key: 'requestDetails.requestType',
      label: 'סוג הבקשה',
      name: 'requestDetails.requestType',
      type: 'select',
      options: getAssistanceTypeOptions(),
    },
    {
      key: 'requestDetails.requestSubType',
      label: 'תת-סוג',
      name: 'requestDetails.requestSubType',
      type: 'multi-select',
      dependsOn: 'requestDetails.requestType',
      getOptions: (selectedValues: Record<string, string>) => {
        const selectedType = selectedValues['requestDetails.requestType'];
        if (selectedType) {
          return getSubTypeOptions(selectedType);
        }
        return [];
      },
    },
    {
      key: 'requesterDetails.requesterName',
      label: 'מי צריך עזרה',
      name: 'requesterDetails.requesterName',
      type: 'text',
    },
  ];

  const cardRenderer = {
    cardType: 'marketplace',
    title: (item: IRequest) => item.requestDetails.requestName,
    description: (item: IRequest) =>
      item.requestDetails.requestDescription || 'No description available',
    imageUrl: (item: IRequest) => item.requestDetails.requestImage || undefined,    
    metaData: (item: IRequest) => [
      {
        label: '',
        icon: item.requestDetails.requestType.icon ?? 'box'
      },
      {
        label: item.requesterDetails.city?.label ?? item.requesterDetails.district?.label ?? '',
        icon: 'location'
      },
      {
        label: new Date(item.requestStatus.createdAt || '').toLocaleDateString() || '',
        icon: 'calendar'
      },
    ],
  };

  return (
    <div>
      <PageHeader title="כל הבקשות" />
      <TableOrCards<IRequest>
        data={assistanceRequests}
        columns={[
          {
            label: 'שם הבקשה',
            render: row => row.requestDetails.requestName,
          },
          { label: 'מספר סידורי-id', render: row => row.id },
          {
            label: 'סוג הבקשה',
            render: row =>
              getAssistanceTypeLabel(row.requestDetails.requestType.label),
          },
        ]}
        searchField="requestDetails.requestName"
        searchPlaceholder="חיפוש לפי שם הבקשה או לפי פילטר חכם בכפתור..."
        filterOptions={filterOptions}
        cardRenderer={cardRenderer}
        panelRenderer={row => [
          { label: 'שם הבקשה', value: row.requestDetails.requestName || '' },
          {
            label: 'סוג הבקשה',
            value: getAssistanceTypeLabel(row.requestDetails.requestType.label),
          },
          {
            label: 'תת-סוג',
            value:
              row.requestDetails.requestSubType
                ?.map(subType => getAssistanceSubTypeLabel(subType.label))
                .join(', ') || 'לא צוין',
          },
          {
            label: 'תיאור הבקשה',
            value:
              row.requestDetails.requestDescription ||
              'No description available',
          },
          {
            label: 'מי צריך עזרה',
            value: row.requesterDetails.requesterName || '',
          },
          { label: 'טלפון', value: row.requesterDetails.phone || '' },
          { label: 'עיר', value: row.requesterDetails.city?.label || '' },
          { label: 'מחוז', value: row.requesterDetails.district?.label || '' },
        ]}
        defaultViewMode="table"
        showViewToggle={true}
      />
    </div>
  );
};

export default RequestsPage;
