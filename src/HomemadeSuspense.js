import React from 'react'

let externalSetState
class HomemadeSuspense extends React.Component {
  state = { hasError: false }

  constructor(props) {
    super(props)
    externalSetState = this.setState.bind(this)
  }

  static getDerivedStateFromError(error) {
    if (error.promise) {
      error.promise.then(() => {
        externalSetState({ hasError: false })
      })
    }

    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default HomemadeSuspense
