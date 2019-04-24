import React from 'react';
import Confirm from '../confirm/confirm';

export default function (props) {
    return (
        <div>
            <Confirm
                header="You are about to withdraw loan request. Are you sure?"
                confirmText="YES"
                cancelText="NO"
                onConfirm={() => props.onConfirm(props.issuanceHash)}
                onCancel={props.onCancel}>
            </Confirm>
        </div>
    );
}