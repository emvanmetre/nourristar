import React from 'react'
import { Accordion, DialogTrigger, ActionButton, Dialog, Heading, Content, Divider, Text, Disclosure, DisclosureTitle, DisclosurePanel } from '@adobe/react-spectrum'

const Home = () => {
  document.body.classList.add('bg-light')
  return (
    <div style={{ width: '50%', paddingLeft: '25%' }}>
      <Accordion defaultExpandedKeys={['personal']}>
        <Disclosure id="personal">
          <DisclosureTitle>Personal Information</DisclosureTitle>
          <DisclosurePanel>Personal information form here.</DisclosurePanel>
        </Disclosure>
        <Disclosure id="billing">
          <DisclosureTitle>Billing Address</DisclosureTitle>
          <DisclosurePanel>Billing address form here.</DisclosurePanel>
        </Disclosure>
      </Accordion>
    </div>
  )
}

export default Home
