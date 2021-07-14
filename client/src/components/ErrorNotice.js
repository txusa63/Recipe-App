import React, { useState } from 'react';
import { Alert } from 'reactstrap';


const ErrorNotice = (props) => {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    return (
        <div >
            <Alert color='danger' isOpen={visible} toggle={onDismiss} onClick={props.clearError}>{props.message}</Alert>
        </div>
    )
}

export default ErrorNotice
