import React from 'react'

const LoadingSvg = () => {
  return (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50"cy="50"r="45" fill="none" stroke="white" strokeWidth="7">
                <animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite"from="0 360"to="360 360"/>
                <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="-300"/>
            </circle>
        </svg>

    </div>
  )
}

export default LoadingSvg