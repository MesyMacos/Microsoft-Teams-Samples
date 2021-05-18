import React, { Component } from 'react';

import { withMeetingTokenService } from '../context/MeetingServiceProvider';
import TokenIndicator from "../components/TokenIndicator";
import StatusRefresher from "../components/StatusRefresher";

class PreMeeting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentToken: 0,
            maxTokenIssued: 0,
            participantCount: "0",
        }
    }
    
    onStatusRefresh = ({ success, msg: data }) => {
        if (!success) {
            this.props.onError(data);
            return;
        }
        const { MeetingMetadata: { CurrentToken, MaxTokenIssued }, UserTokens} = data;
        this.setState({
            currentToken: UserTokens.length > 0 ? CurrentToken : "N/A",
            maxTokenIssued: MaxTokenIssued,
            participantCount: (UserTokens.length || "0"),
        });
    }
    
    render() {
        return (
            <div className="app-container" >
                <StatusRefresher onStatusRefresh={this.onStatusRefresh} />
                <TokenIndicator show={true} value={this.state.currentToken} title={"Current Token"} />
                <TokenIndicator show={true} value={this.state.maxTokenIssued} title={"Max Token Issued"} />
                <TokenIndicator show={true} value={this.state.participantCount} title={"Queue Length"} />
            </div>
        );
    }
}

export default withMeetingTokenService(PreMeeting);