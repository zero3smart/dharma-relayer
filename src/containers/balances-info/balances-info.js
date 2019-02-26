import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTokenBalance, lockToken, unlockToken, getTokenLock, getTokenName } from '../../actions';
import BalancesTable from '../../components/balances-table/balances-table.js';

let destroyTimer = null;

let startTimer = (func) => {
    destroyTimer = setTimeout(() => {
        func();
        startTimer(func);
    }, 10000)
};

class BalancesInfo extends Component {
    constructor(props) {
        super(props);

        this.updateTokens = this.updateTokens.bind(this);
        this.updateLock = this.updateLock.bind(this);
        this.getTokensInfo = this.getTokensInfo.bind(this);
    }

    componentDidMount() {
        let { updateTokens, getTokensInfo } = this;
        updateTokens();
        getTokensInfo();
        startTimer(updateTokens);
    }

    componentWillUnmount() {
        destroyTimer && destroyTimer();
    }

    updateTokens() {
        let { tokenBalances, getTokenBalance } = this.props;
        tokenBalances.forEach(b => {
            getTokenBalance(b.id);
        });
    }

    getTokensInfo() {
        let { tokenBalances, getTokenLock, getTokenName } = this.props;
        tokenBalances.forEach(b => {
            getTokenLock(b.id);
            getTokenName(b.id);
        });
    }

    updateLock(tokenSymbol, unlock) {
        if (unlock) {
            this.props.unlockToken(tokenSymbol);
        }
        else {
            this.props.lockToken(tokenSymbol);
        }
    }

    render() {
        let { tokenBalances } = this.props;

        return (
            <BalancesTable data={tokenBalances} onLockUpdate={this.updateLock} />
        );
    }
}

let mapStateToProps = ({ tokenBalances }) => ({
    tokenBalances: Object.entries(tokenBalances).map((pair) => {
        let key = pair[0];
        let value = pair[1];

        return {
            ...value,
            id: key
        }
    })
});

let mapDispatchToProps = { getTokenBalance, lockToken, unlockToken, getTokenLock, getTokenName };

export default connect(mapStateToProps, mapDispatchToProps)(BalancesInfo);