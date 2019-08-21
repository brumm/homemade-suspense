import 'modern-normalize'
import React, { useState, Fragment } from 'react'
import { render } from 'react-dom'
import useTimeout from 'use-timeout'

import './index.css'
import HomemadeSuspense from './HomemadeSuspense'
import { FileTreeResource } from './resources'

const INDENTATION = 20

const Loading = ({ wait = 1000, children }) => {
  const [showSpinner, set] = useState(false)
  useTimeout(() => set(true), wait)
  return showSpinner ? children : null
}

const Files = ({ path, level }) => {
  const items = FileTreeResource.read(path)

  return (
    <Fragment>
      {items.map(item => (
        <File key={item.sha} {...item} level={level} />
      ))}
    </Fragment>
  )
}

const File = ({ hidden, name, path, type, level = 1 }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const isFolder = type === 'dir'

  return (
    <Fragment>
      <div
        style={{ marginLeft: INDENTATION * level }}
        onClick={() => {
          if (isFolder) {
            setIsExpanded(is => !is)
          }
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            visibility: !isFolder && 'hidden',
            marginRight: 10,
          }}
        >
          {isExpanded ? '-' : '+'}
        </span>
        {name}
      </div>

      {isExpanded && (
        <HomemadeSuspense
          fallback={
            <Loading>
              <div style={{ marginLeft: INDENTATION * (level + 1) }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    visibility: 'hidden',
                    marginRight: 10,
                  }}
                />
                please wait
              </div>
            </Loading>
          }
        >
          <Files level={level + 1} path={path} />
        </HomemadeSuspense>
      )}
    </Fragment>
  )
}

render(
  <HomemadeSuspense fallback={<Loading>please wait</Loading>}>
    <Files path="/" />
  </HomemadeSuspense>,
  document.getElementById('root')
)
