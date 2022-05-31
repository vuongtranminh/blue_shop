import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FormAccount from '../components/FormAccount';

const TabsCustom = (props) => {

  const [tabIndex, setTabIndex] = useState(0);
  const { isRegister } = props;

  return (
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>

          <TabList>
            <Tab>{`${isRegister ? 'Đăng ký' : 'Đăng nhập'} với email`}</Tab>
            <Tab>{`${isRegister ? 'Đăng ký' : 'Đăng nhập'} với SDT`}</Tab>
          </TabList>

          <TabPanel>
            <FormAccount method={{isRegister: isRegister, type: 'email'}}></FormAccount>
          </TabPanel>
          <TabPanel>
          <FormAccount method={{isRegister: isRegister}}></FormAccount>
          </TabPanel>
        </Tabs>
  );
};

export default TabsCustom;
