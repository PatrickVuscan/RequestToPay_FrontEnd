import constants from "../constants";
import React, { Component } from 'react';

/**
 * A Menu Specific To A Single Persona.
 *
 * It provides options to navigate to all orders of a certain status, where the user is of that persona.
 */
class PersonaMenu extends Component {

    /**
     * Constructor
     *
     * @param props - Specifies the persona that the PersonaMenu is specific to.
     */
    constructor(props) {
        super(props);
        this.transitionTo = this.transitionTo.bind(this);
    }

    transitionTo(status) {
        let {persona} = this.props;
        global.presenter.setViewPersona(persona);
        global.presenter.setViewStatus(status);
        global.presenter.transitionTo(constants.VIEW.cardList)
    }

    createStatusList() {
        const {persona} = this.props;
        const statusesObject = constants.STATUS[persona];
        const statuses = Object.keys(statusesObject);
        const listItems = [];
        for (let i = 0; i < statuses.length; i++) {
            let status = statuses[i];
            let statusString = statusesObject[status].string;
            let item = (<li onClick={() => this.transitionTo(statusString)}> {statusString} </li>);
            listItems.push(item);
        }
        return (<ul>{listItems}</ul>);
    }

    render() {
        const {persona} = this.props;
        const wrapperId = persona + "_wrapper";
        const blockId = persona + "_block";
        const personaString = constants.PERSONA[persona].string;

        return (
            <div id={wrapperId}>
                <div className={"home_block"} id={blockId}>
                    <div className={"type_block"}>
                        <h1>{personaString}</h1>
                        {this.createStatusList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default PersonaMenu;
