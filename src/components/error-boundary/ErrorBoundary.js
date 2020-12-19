import React, { Component } from 'react';
import Error from '../Error/Error';

export class ErrorBoundary extends Component {

    state = {
        hasErrored: false
    }

    static getDerivedStateFromError(error) {
        return {hasErrored: true}
    }

    render() {
        if(this.state.hasErrored) {
            return <Error />
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
