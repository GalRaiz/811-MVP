import React, { useMemo } from 'react';
import { useAssistanceForm } from '../../hooks/useAssistanceForm';
import FormField from '../storybook/FormField/FormField';
import { locationsFormMock } from '../../data/formsData/locationsFormMock';

/**
 * LocationStep - Step 2: Location Information
 *
 * This component handles the collection of location information including
 * district, city, and street. It's wrapped by StepWrapper for consistent styling.
 */
const LocationStep: React.FC = () => {
  const { formState, updateDistrictField, updateCityField, updateFormField } =
    useAssistanceForm();

  const handleFieldChange = (
    fieldName: 'district' | 'city' | 'street',
    value: string
  ) => {
    if (fieldName === 'district') {
      // Clear city when district changes
      updateCityField({ id: '', label: '', name: '' });
      
      // Find the district object and set it properly
      const selectedDistrict = locationsFormMock.find(
        district => district.id === value
      );
      if (selectedDistrict) {
        updateDistrictField({
          id: selectedDistrict.id,
          name: selectedDistrict.name,
          label: selectedDistrict.label,
        });
      }
    } else if (fieldName === 'city') {
      // Find the city from the locations data
      const district = locationsFormMock.find(d => d.id === formState.district?.id);
      const selectedCity = district?.cities?.find(city => city.id === value);
      if (selectedCity) {
        updateCityField({
          id: selectedCity.id,
          name: selectedCity.name,
          label: selectedCity.label,
        });
      }
    } else if (fieldName === 'street') {
      updateFormField('street', value);
    }
  };

  // District options from mock data
  const districtOptions = useMemo(() => {
    return locationsFormMock.map(district => ({
      label: district.label, // Hebrew label
      value: district.id,
    }));
  }, []);

  // City options based on selected district
  const cityOptions = useMemo(() => {
    if (!formState.district?.id) {
      return [];
    }

    const selectedDistrict = locationsFormMock.find(
      district => district.id === formState.district?.id
    );

    if (!selectedDistrict) {
      return [];
    }

    return selectedDistrict.cities.map(city => ({
      label: city.label, // Hebrew label
      value: city.id,
    }));
  }, [formState.district?.id]);

  // Check if city field should be disabled
  const isCityDisabled = !formState.district;

  return (
    <>
      <FormField
        id="district"
        label="מחוז"
        placeholder="בחר מחוז"
        type="select"
        value={formState.district?.id || ''}
        onChange={value => handleFieldChange('district', value as string)}
        options={districtOptions}
        hasDropdown={true}
        showClear={true}
        required
      />

      <FormField
        id="city"
        label="עיר"
        placeholder={isCityDisabled ? 'בחר תחילה מחוז...' : 'בחר עיר'}
        type="select"
        value={formState.city?.id || ''}
        onChange={value => handleFieldChange('city', value as string)}
        options={cityOptions}
        hasDropdown={true}
        showClear={true}
        disabled={isCityDisabled}
        required
      />

      <FormField
        id="street"
        label="רחוב"
        placeholder="שם הרחוב (אופציונלי)"
        type="text"
        value={formState.street || ''}
        onChange={value => handleFieldChange('street', value as string)}
        showClear={true}
      />
    </>
  );
};

export default LocationStep;
