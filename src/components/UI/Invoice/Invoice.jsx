import moment from 'moment';
import React, { Component } from 'react';
import NesoLogo from "../../../assets/images/Logos/NesoLogo.svg";
import './Print-receipt-styles.css'
import { getCurrencySymbol, isSGST, getGSTtype, firstCaps, separteTaxComponents, getExpiryDate, getOrderDate,  getFormattedAddressLines } from '../../../Services/Utils';


const Invoice = ({ user, order_id, invoice }) => {

    function amountinWords(num) {
        var n = "";
        var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
        var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        if ((num = num.toString()).length > 9) return 'overflow';
        n = ('000000000' + num).substring((num+"").length).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return ""; 
        var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
        return str;
    }


    const expiry_date = getExpiryDate(order_id, invoice.validity)
    const order_date = getOrderDate(order_id)
    const order_date_short = getOrderDate(order_id,true)
    const currency = getCurrencySymbol(invoice.currency)
    const finalPrice  = (invoice.amt / 100).toFixed(2)
    const discount = invoice.discount || 0
    const gstAmount = ((invoice.amt / 100)/(1-discount))
    const { netCost, tax } = separteTaxComponents(Number(gstAmount))
    const name = invoice.name || user.name
    const mobile = invoice.mobile || user.phNo
    const email = invoice.email || user.email


    return (
        <div
            className='invoice-root'
            link="#000080"
            vlink="#800000"
            dir="ltr"
            lang="en-IN">
            <head>
                <title>{order_id}</title>
            </head>
            <p style={{ lineHeight: "108%", marginBottom: "0.11in" }}>
            <p
                style={{ float: "right", lineHeight: "108%", marginTop: "0.17in", marginBottom: "0.11in" }}
            >
                <font style={{ fontSize: "20pt" }} size={4}>
                    <b>Tax Invoice/Cash Memo</b>
                </font>
            </p>
                <img
                    src={NesoLogo}
                    name="Picture 2"
                    width={287}
                    height={40}
                    alt=""
                    border={0}
                    align="bottom"
                />
                <p  style={{color : "gray",lineHeight: "1.2" ,marginLeft: 54, marginBottom: 0, position: "relative", top: -14}}>
                S-019SF, Site-4, Kasna GNS Plaza, <br/>Greater Noida, Gautam Buddha Nagar, <br/>Uttar Pradesh 201308
                <div style={{marginTop: 4}}>
                GSTIN: 09AAGCN7973C1Z5
                </div>
                </p>
                
            </p>
            <table style={{marginTop: 32, borderCollapse: "collapse",}} width={369} cellSpacing={0} cellPadding={5}>
                <colgroup>
                    <col width={357} />
                </colgroup>
                <tbody>
                    <tr>
                        <td
                            style={{  border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={357}
                            height={4}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Billing Address</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                    </tr>
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={357}
                            height={33}
                        >
                            <p
                                style={{ orphans: 2, widows: 2, marginBottom: "0in" }}
                                align="left"
                            >
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        {name}                <br/>     
                                        { email && <span>Email: <span>{email}  </span><br/> </span>}
                                        { mobile && <span>Mobile No.: <span>{mobile}</span></span>}                                                                                
                                    </font>
                                </font>
                            </p>
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>                                    
                                        {invoice.address.split('\n').map(line => <div>{line}</div> )}
                                    </font>
                                </font>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p
                style={{ lineHeight: "24px", marginTop: "0.17in", marginBottom: "0.11in" }}
            >
                <b>Customer GSTIN:</b> {invoice.gstn || "Nil"}
                <br />
                <b>Order Date:</b> {order_date}
            </p>
            <p style={{ fontSize: '14pt', lineHeight: "108%", marginBottom: "0.11in" }}>
                <b>Plan Summary</b>
            </p>
            <table style={{borderCollapse: "collapse",}} width={751} cellSpacing={0} cellPadding={5}>
                <colgroup>
                    <col width={260} />
                    <col width={96} />
                    <col width={85} />
                    <col width={73} />
                    <col width={84} />
                    <col width={91} />
                </colgroup>
                <tbody>
                    <tr>
                        <td
                            style={{
                                background: "#d9d9d9",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={260}
                            bgcolor="#d9d9d9"
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Description</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{
                                background: "#d9d9d9",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={96}
                            bgcolor="#d9d9d9"
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Net Amount</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{
                                background: "#d9d9d9",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={85}
                            bgcolor="#d9d9d9"
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Tax Rate</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{
                                background: "#d9d9d9",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={73}
                            bgcolor="#d9d9d9"
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Tax Type</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{
                                background: "#d9d9d9",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={84}
                            bgcolor="#d9d9d9"
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Tax Amount</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{
                                background: "#d9d9d9",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={91}
                            valign="top"
                            bgcolor="#d9d9d9"
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Total Amount</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                    </tr>
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={260}
                            height={19}
                        >
                            <p style={{ orphans: 2, widows: 2, marginBottom: "0in" }}
                                align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        Neso Fuel {firstCaps(invoice.purchases.plan)} - {invoice.duration} month{invoice.duration > 1 && "s"}
                                    </font>
                                </font>
                            </p>
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        ({order_date_short  } - {expiry_date})
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={96}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                {currency}
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        {Math.round(netCost)}
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={85}
                        >
                            <p
                                style={{ orphans: 2, widows: 2, marginBottom: "0in" }}
                                align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        18%
                                    </font>
                                </font>
                            </p>
                            {
                                isSGST(invoice.address) && (
                                    <p style={{ orphans: 2, widows: 2 }} align="left">
                                        <font face="Calibri, serif">
                                            <font style={{ fontSize: "11pt" }} size={2}>
                                                (9% + 9%)
                                            </font>
                                        </font>
                                    </p>
                                )
                            }
                        </td>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={73}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        {getGSTtype(invoice.address)}
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={84}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                {currency}
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        {tax}
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={91}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                {currency}{gstAmount.toFixed(2)}
                                {discount && <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                         <br/><br/><div>(-{discount * 100}%)</div>
                                    </font>
                                </font>}
                            </p>
                        </td>
                    </tr>
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr>
                        <td
                            colSpan={4}
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={544}
                            height={19}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>TOTAL</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{
                                background: "#d9d9d9",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={84}
                            bgcolor="#d9d9d9"
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>{currency}{tax}</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{
                                background: "#d9d9d9",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={91}
                            bgcolor="#d9d9d9"
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">                                
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>{currency}{finalPrice}</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                    </tr>
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr>
                        <td
                            colSpan={6}
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={739}
                            height={44}
                        >
                            <p
                                style={{ orphans: 2, widows: 2, marginBottom: "0in" }}
                                align="left"
                            >
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Amount in Words:</b>
                                    </font>
                                </font>
                            </p>
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>{amountinWords(parseInt(finalPrice))} Only</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p style={{ lineHeight: "108%", marginBottom: "0.11in" }}>
                <br />
                <br />
            </p>
            <p style={{ fontSize: '14pt', lineHeight: "108%", marginBottom: "0.11in" }}>
                <b>Transaction Details</b>
            </p>
            <table style={{borderCollapse: "collapse",}} width={751} cellSpacing={0} cellPadding={5}>
                <colgroup>
                    <col width={142} />
                    <col width={214} />
                    <col width={179} />
                    <col width={174} />
                </colgroup>
                <tbody>
                    <tr>
                        <td
                            style={{
                                background: "transparent",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={214}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Transaction ID</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{
                                background: "transparent",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={179}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Order ID</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{
                                background: "transparent",
                                border: "1.5px solid #000000",
                                padding: "0.04in 0.08in"
                            }}
                            width={174}
                            valign="top"
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        <b>Order Date</b>
                                    </font>
                                </font>
                            </p>
                        </td>
                    </tr>
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr />
                    <tr>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={214}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        {invoice.trans_id}
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={179}
                        >
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        {order_id}
                                    </font>
                                </font>
                            </p>
                        </td>
                        <td
                            style={{ border: "1.5px solid #000000", padding: "0.04in 0.08in" }}
                            width={174}
                        >
                            <p
                                style={{ orphans: 2, widows: 2, marginBottom: "0in" }}
                                align="left"
                            >
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        {order_date}
                                    </font>
                                </font>
                            </p>
                            <p style={{ orphans: 2, widows: 2 }} align="left">
                                <font face="Calibri, serif">
                                    <font style={{ fontSize: "11pt" }} size={2}>
                                        ({moment(parseInt(order_id.substring(4, order_id.length - 3))).format("hh:mm a")} IST)
                                    </font>
                                </font>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p style={{ lineHeight: "108%", marginBottom: "0.11in" }}>
                <br />
                <br />
            </p>
            <div title="footer">
                <p style={{ lineHeight: "100%", marginTop: "0.47in", marginBottom: "0in" }}>
                    No signature is required, since it is a computer-generated invoice.
                </p>
            </div>
        </div>

    )
};

export default Invoice

export class InvoiceClassWrapper extends Component {

    render() {
        return <Invoice {...this.props} />
    }
}