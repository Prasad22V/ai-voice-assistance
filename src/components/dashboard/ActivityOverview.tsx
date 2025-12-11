import React from 'react'
import NextAppoitment from './NextAppoitment';
import DentalHealthOverview from './DentalHealthOverview';


const ActivityOverview = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <DentalHealthOverview />
      <NextAppoitment />
    </div>
  )
}

export default ActivityOverview