import Button from '../components/storybook/Button/Button';
import { Icons } from '../components/storybook/icons/EmojiIcons';
import PageHeader from '../components/storybook/NavBar/PageHeade';
import logo from '../assets/mate-logo-white.png';
import Card from '../components/storybook/Card/Card';
import Modal from '../components/storybook/Modal/Modal';
import Table from '../components/storybook/Table/Table';
import Tabs from '../components/storybook/Modal/Tabs';
import { useState } from 'react';
import FormFieldDemo from './FormFieldDemo';

const ComponetsTests = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <PageHeader title="טופס בקשת סיוע" logo={logo} />
      <FormFieldDemo />
      <div className="components-tests">
        <Button btnText="פתח מודל" onClick={handleOpenModal} />
        <Card title="טופס בקשת סיוע" />
        <Button type="alert" btnText="Alert" icon={Icons.warning} />
        <Button type="success" btnText="Success" icon={Icons.check} />
        <Button type="info" btnText="Info" icon={Icons.info} />
        <Button type="cancel" btnText="Cancel" icon={Icons.close} />
        <Button type="warning" btnText="Warning" icon={Icons.warning} />
        <br />
        <Button
          type="transparent-on-light"
          btnText="Transparent on Light"
          icon={Icons.search}
        />
        <Button
          type="transparent-on-dark"
          btnText="Transparent on Dark"
          icon={Icons.search}
        />
        <br />
        <Button type="icon-only" icon={Icons.search} />
        <br />
        <Button iconPosition="right" btnText="Icon Right" icon={Icons.search} />
        <Button iconPosition="left" btnText="Icon Left" icon={Icons.search} />
        <br />
        <Button
          iconPosition="right"
          btnText="open small modal"
          icon={Icons.search}
        />
        <Button
          iconPosition="right"
          btnText="open medium modal"
          icon={Icons.search}
        />
        <Button
          iconPosition="right"
          btnText="open large modal"
          icon={Icons.search}
        />
        <Button
          iconPosition="right"
          btnText="open full modal"
          icon={Icons.search}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="טופס בקשת סיוע"
        size="medium"
      >
        <Tabs
          tabs={[
            {
              label: 'טופס בקשת סיוע',
              content: (
                <Table
                  data={[
                    {
                      id: 1,
                      name: 'טופס בקשת סיוע',
                      description: 'טופס בקשת סיוע',
                    },
                  ]}
                  columns={[
                    {
                      label: 'שם',
                      render: row => row.name,
                    },
                    {
                      label: 'תיאור',
                      render: row => row.description,
                    },
                  ]}
                />
              ),
            },
            {
              label: 'טופס בקשת סיוע',
              content: <Table data={[]} columns={[]} />,
            },
          ]}
        />
      </Modal>
    </>
  );
};

export default ComponetsTests;
