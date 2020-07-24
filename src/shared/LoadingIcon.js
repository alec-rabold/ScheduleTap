import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default class LoadingIcon extends React.Component {
    render() {
        const { message } = this.props;
        return (
            <div className="load-icon">
                <AiOutlineLoading3Quarters className="load-icon fa fa-spin" />
                {message != null &&
                    <span>{message}</span>
                }
            </div>
        )
    }
}
