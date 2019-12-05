/* Invoice Menu is the invoice confirmation menu for the Order View */

import React, {Component} from "react";
import constants from "../constants";
import "./InvoiceMenu.css"

const VIEW = constants.VIEW;

class InvoiceMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.transitionTo = this.transitionTo.bind(this);
        this.toggleInvoiceMenuOpen = this.toggleInvoiceMenuOpen.bind(this);
        this.processInvoice = this.processInvoice.bind(this);
    }

    transitionTo(view){
        this.togglePayMenuOpen();
        global.presenter.transitionTo(view);
    }

    processInvoice(){
        let {updateOrder} = this.props;
        console.log(updateOrder);
        this.toggleInvoiceMenuOpen();
        global.presenter.statusApproved(updateOrder) // Invoice functions in Presenter.
    }

    toggleInvoiceMenuOpen(){
        this.props.order.toggleInvoiceMenuOpen()
    }

    render() {
        return (
            <div
                id={"invoiceMenu_block"}
                className={"seller-accent"}
            >
                <div id={"invoiceMenu_title"}>
                    Send Invoice?
                </div>

                <div id={"payMenu_options_wrapper"}>
                    <div id={"payMenu_options"}
                         className={"button"}
                         onClick={() => this.processInvoice()}>
                        YES
                    </div>
                    {/*<div id={"payMenu_options"}*/}
                    {/*     className={"button"}*/}
                    {/*     onClick={() => global.presenter.transitionTo(VIEW.invoice)}>*/}
                    {/*    UPDATE*/}
                    {/*</div>*/}
                    <div id={"payMenu_options"}
                         onClick={() => this.toggleInvoiceMenuOpen()}>
                        NO
                    </div>
                </div>
            </div>
        );
    }
}

export default InvoiceMenu;
