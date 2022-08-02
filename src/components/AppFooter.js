import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        Created by Ahlam Chakrane
        <span className="ms-1">&copy; 2022</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
