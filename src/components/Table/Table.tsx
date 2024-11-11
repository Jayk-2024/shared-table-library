/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
import React, { ReactElement, useEffect, useState } from "react";
// import { FormGroup } from "reactstrap";
// import { Button, Form } from "react-bootstrap";
// import { BootstrapTable, TableHeaderColumn } from "../../../node_modules/react-bootstrap-table";
import {
  BootstrapTable,
  TableHeaderColumn,
} from "../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.js";
import moment from "../../../node_modules/moment-timezone/moment-timezone-utils";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"; // Make sure to import the CSS
import { FormGroup } from "../../../node_modules/reactstrap/types/index";
import Button from "../../../node_modules/react-bootstrap/esm/Button";
import { Form } from "../../../node_modules/react-bootstrap/esm/index";

interface TableProps {
  data: Array<{
    listingId: number;
    eventId: string;
    eventDetails: string;
    [key: string]: any;
  }>; // Adjust the shape as per your data
  deleteOpenListingsRequest: any;
  ticketPurchasedRequest: any;
  type: any;
  saveSelectEvent: any;
  saveSelectedEventFrom: any;
  userInfo: any;
  updateEventTmOrderNumber: any;
  updateIsBlackListRequest: any;
  addBlackListPriceSectionRequest: any;
  FetchBlackListPriceSectionRequest: any;
  isBlackListingFetching: any;
  isAddBlackListFetching: any;
  from: any;
  markOrderAsBustedRequest: any;
  onActionClick: (id: number, action: string) => void;
  options: object; // Assuming 'options' is passed for the table configuration
  trClassName: string;
  selectRow: object; // Assuming 'selectRow' is an object passed for row selection
  isExpandRow: boolean;
  expandRow: (rowIndex: number) => void;
  actions?: () => JSX.Element; // Optional actions like buttons or custom content
  isBlackListModal: boolean;
  onCloseBlackListModal: () => void;
  onOkBlackListModal: () => void;
  blackListModalData: any; // Adjust type based on your modal data
  blackListSectionModel: boolean;
  isBustedOrderModal: boolean;
  bustedOrderNote: string;
  setBustedOrderNote: React.Dispatch<React.SetStateAction<string>>;
  penaltyAmount: number;
  setPenaltyAmount: React.Dispatch<React.SetStateAction<number>>;
  blackListInfo: any;
  blackListData: any;
  blacklistedSections: any[];
  BustedOrderModal: any;
  BlackListSection: any;
  AlertModal: any;
  BlackListModal: any;
  TYPE_TRANSFER_LISTING: any;
  TYPE_SALE_LISTING: any;
  TYPE_PROBLEM_BUYING_LISTING: any;
  dateSortFuncForEvent: any;
  dateFormatter: any;
  numberFormatterwithoutFraction: any;
  TicketPurchased: any;
}

// const Table = ({ data, onActionClick }: TableProps) => {
//   // Component implementation
//   return (
//     <div>
//       {data.map((item) => (
//         <div key={item.id}>
//           {item.name} - {item.value}
//           <button onClick={() => onActionClick(item.id, 'edit')}>Edit</button>
//           <button onClick={() => onActionClick(item.id, 'delete')}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

const selectRow = {
  mode: "checkbox",
  clickToExpand: true,
};

// const priceFormat = cell => cell && <i>{`$${cell}`}</i>

const Table = ({
  data,
  actions,
  blackListInfo,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  type,
  saveSelectEvent,
  saveSelectedEventFrom,
  userInfo,
  updateEventTmOrderNumber,
  updateIsBlackListRequest,
  addBlackListPriceSectionRequest,
  FetchBlackListPriceSectionRequest,
  isBlackListingFetching,
  isAddBlackListFetching,
  from,
  markOrderAsBustedRequest,
  BustedOrderModal,
  BlackListSection,
  AlertModal,
  BlackListModal,
  TYPE_TRANSFER_LISTING,
  TYPE_SALE_LISTING,
  TYPE_PROBLEM_BUYING_LISTING,
  dateSortFuncForEvent,
  dateFormatter,
  numberFormatterwithoutFraction,
  TicketPurchased,
}: TableProps): ReactElement<any, any> => {
  // const isNotEmpty = Array.isArray(data)
  //   ? data.length || 0
  //   : Object.keys(data).length || 0

  const [showTicketPurchased, setShowTicketPurchased] = useState(false);
  const [purchasedKey, setPurchasedKey] = useState("");
  const [OrderNotes, setOrderNotes] = useState(false);
  const [tmOrderEventId, setTmOrderEventId] = useState("");
  const [isBlackListModal, setIsBlackListModal] = useState(false);
  const [blackListModalData, setBlackListModalData]: any = useState(null);
  const [blacklistReason, setBlacklistReason] = useState("");
  const [blacklistReasonSelected, setBlacklistReasonSelected] = useState("");
  const [erroMessage, setErroMessage] = useState("");
  const [isAlreadyBlackListModal, setIsAlreadyBlackListModal] = useState(false);
  const [showComplicatedOrders, setShowComplicatedOrders] = useState(false);
  const [eventDBId, setEventDBId] = useState("");
  const [is_blackList, setIsBlackList] = useState("");
  const [blacklistedSections, setBlacklistedSections] = useState("");
  const [blackListSectionModel, setBlackListSectionModal] = useState(false);
  const [blackListPOS, setBlackListPOS] = useState([]);
  const [blackListFromError, setBlackListFromError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [isBustedOrderModal, setIsBustedOrderModal] = useState(false);
  const [bustedOrderNote, setBustedOrderNote] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [bustedOrderListingId, setBustedOrderListingId] = useState("");

  let blackListData = [];

  const trClassName = (row, rowIndex) => {
    if (!row) return "";

    if (type === TYPE_SALE_LISTING) {
      const { currentlyTryingToBuy, problemBuying, readyToBuy, username } = row;

      if (currentlyTryingToBuy) {
        return "yellow-bg-cl";
      }

      if (problemBuying) {
        return from === "tempErrorOrders"
          ? "purple-bg-cl"
          : "red-bg-cl blink-red";
      }

      if (readyToBuy != undefined && !readyToBuy) {
        return "purple-bg-cl";
      }

      if (userInfo.role == "buyer") {
        if (userInfo.username == username) {
          return "green-bg-cl blink-gn";
        } else {
          return "skyblue-bg-cl";
        }
      }

      if (row.saleType == "Day of sale") {
        return "green-bg-cl blink-gn-fast";
      } else {
        return "green-bg-cl blink-gn";
      }
    } else if (type === TYPE_TRANSFER_LISTING) {
      return "";
    }
  };

  const onCloseBustedModal = () => {
    setIsBustedOrderModal(false);
    setPenaltyAmount("");
    setBustedOrderNote("");
    setBustedOrderListingId("");
  };

  const onOkBustedModal = () => {
    markOrderAsBustedRequest({
      bustedOrderNote,
      penaltyAmount,
      listingId: bustedOrderListingId,
      from,
    });
    onCloseBustedModal();
  };

  const createCustomDeleteButton = (onBtnClick) => {
    return (
      <>
        <div className="d-flex align-items-center">
          <Button color="primary" className="btn-pill" onClick={onBtnClick}>
            {type == TYPE_TRANSFER_LISTING
              ? "Complete Order"
              : "Ticket Purchased"}
          </Button>

          {from === "tempErrorOrders" && (
            <FormGroup controlid="secRowChk" className="chk-secRow">
              <Form.Check
                checked={showComplicatedOrders}
                type="checkbox"
                id="complicated___orders"
                name="complicated___orders"
                onChange={(evt) => {
                  setShowComplicatedOrders(evt.target.checked);
                }}
                label="Show Complicated Orders"
              />
            </FormGroup>
          )}
        </div>

        {showTicketPurchased ? (
          <TicketPurchased
            userInfo={userInfo}
            purchasedKey={purchasedKey}
            ticketPurchasedRequest={ticketPurchasedRequest}
            isTicketPurchase={(isTicketPurchaseOpen) =>
              setShowTicketPurchased(isTicketPurchaseOpen)
            }
          />
        ) : (
          ""
        )}
      </>
    );
  };

  const customConfirm = (next, dropRowKeys) => {
    if (type === TYPE_TRANSFER_LISTING) {
      deleteOpenListingsRequest(dropRowKeys);
    } else if (
      type === TYPE_SALE_LISTING ||
      type === TYPE_PROBLEM_BUYING_LISTING
    ) {
      setShowTicketPurchased(true);
      setPurchasedKey(dropRowKeys);
      // ticketPurchasedRequest(dropRowKeys)
    }
    // next()
  };

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: from === "tempErrorOrders" ? 5 : 20, // which size per page you want to locate as default
    pageStartIndex: 1, // where to start counting the pages
    paginationSize: 3, // the pagination bar size.
    prePage: "Prev", // Previous page button text
    nextPage: "Next", // Next page button text
    firstPage: "First", // First page button text
    lastPage: "Last", // Last page button text
    paginationShowsTotal: true, // Accept bool or function
    hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, //> Hide the going to First and Last page button
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm,
    expandBy: "column",
    defaultSortName: "eventDetails", // default sort column name
    // defaultSortOrder: "desc" // default sort order
  };

  const TMAndGAFormatter = (cell, row) => {
    if (row.isGa == true) return row.gaAvailability;
    else return row.highestRowsBack;
  };

  const newUrlFormatter = (cell, row) => {
    let hasSkyboxEventId = false;
    let skyboxEventURL = "";
    if (row.skyBoxEventId) {
      hasSkyboxEventId = true;
      skyboxEventURL = `https://www.vividseats.com/production/${row.skyBoxEventId}`;
    }
    return (
      <>
        <a
          href={
            row.eventUrl !== "" && row.eventUrl !== null
              ? row.eventUrl
              : row.ticketMasterUrl
          }
          target="_blank"
        >
          {row.eventId}
        </a>
        {hasSkyboxEventId && (
          <>
            <br />
            <br />
            <Form.Label className="custom_form_label">
              Vivid Event Id
            </Form.Label>
            <a href={skyboxEventURL} target="_blank">
              {row.skyBoxEventId}
            </a>
          </>
        )}
      </>
    );
  };

  const detailsFormatter = (cell, row) => {
    let hasSkyboxInfo = false;
    if (row.hasOwnProperty("skyboxEventInfo") && row.skyboxEventInfo != null) {
      hasSkyboxInfo = true;
    }
    let detailsHTML = (
      <div>
        <span>{row.eventName}</span>
        <br />
        <span>{row.eventAddress}</span>
        <br />
        <span>{row.eventDate}</span>

        {hasSkyboxInfo && (
          <>
            <br />
            <br />
            <Form.Label className="custom_form_label">
              Vivid Event Info
            </Form.Label>
            <span>{row.skyboxEventInfo.name}</span>
            <br />
            <span>{row.skyboxEventInfo.venueName}</span>
            <br />
            <span>{dateFormatter(row.skyboxEventInfo.date)}</span>
            <br />
          </>
        )}
        {row.complicatedOrderNote && (
          <>
            <br />
            <Form.Label className="custom_form_label">
              Complicated Order Notes:{" "}
            </Form.Label>
            <span>{row.complicatedOrderNote}</span>
          </>
        )}
      </div>
    );

    return detailsHTML;
  };

  const sectionFormatter = (cell, row) => {
    return (
      <div>
        <span>Seat: {row.seat}</span>
        <br />
        <span>Qty: {row.quantitySold}</span>
        <br />
        <span>
          Base Cost:{" "}
          {row.baseCost ? numberFormatterwithoutFraction(row.baseCost) : ""}
        </span>
        <br />
        <span>
          Final Cost:{" "}
          {row.unitCost ? numberFormatterwithoutFraction(row.unitCost) : ""}
        </span>
      </div>
    );
  };

  const isExpandRow = () => {
    return true;
  };

  const expandRow = (row) => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>External Reference</label>{" "}
          <span className="row_val"> {`${row.externalReference || ""}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>Sale Time</label>{" "}
          <span className="row_val"> {`${row.saleTime}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>InvoiceId</label>{" "}
          <span className="row_val">
            <a href={row.invoiceIdUrl} target="_blank">
              {row.invoiceId}
            </a>
            {type === TYPE_TRANSFER_LISTING ? (
              ""
            ) : (
              <Button
                className="problematic_btn"
                variant="primary"
                onClick={() => {
                  saveSelectEvent(row);
                  saveSelectedEventFrom("ListingsDataTable");
                  const win = window?.open(
                    `/#/event/${row.eventId}`,
                    "_blank"
                  ) as any;
                  win.window.from = "ListingsDataTable";
                  win.focus();
                  // history.push({
                  //   pathname: `/event/${row.eventId}`,
                  //   state: { from: "ListingsDataTable" }
                  // })
                }}
              >
                View Event
              </Button>
            )}
          </span>
        </div>
        <div className="expand_row_inner">
          <label>Order Notes </label>
          {OrderNotes && tmOrderEventId === row.eventId ? (
            <>
              <Form.Control
                type="text"
                className="problematic_form_control"
                id={row.eventId}
                defaultValue={`${row.orderNotes || ""}`}
                onChange={(evt) => {
                  row.orderNotes = evt.target.value;
                }}
              />
              <Button
                className="problematic_btn"
                variant="primary"
                id={row.eventId}
                onClick={() => {
                  var order_Notes = row.orderNotes;
                  var orderNum = row.orderNum;
                  var listingId =
                    row.listingId !== undefined ? row.listingId : "";
                  updateEventTmOrderNumber({
                    listingId: listingId,
                    orderNotes: order_Notes,
                    orderNum,
                  });
                  setOrderNotes(false);
                }}
              >
                Update Notes
              </Button>
            </>
          ) : (
            <span
              className="row_val"
              onClick={() => {
                setOrderNotes(true);
                setTmOrderEventId(row.eventId);
              }}
              style={{ cursor: "pointer", display: "block" }}
            >
              {row.orderNotes ? `${row.orderNotes}` : <>&nbsp;</>}
            </span>
          )}
        </div>
        <div className="expand_row_inner">
          <label>BlackList</label>{" "}
          <span className="row_val">
            {type === TYPE_TRANSFER_LISTING ? (
              ""
            ) : (
              <>
                <Button
                  className="problematic_btn"
                  variant="primary"
                  onClick={() => {
                    if (row.is_blackList) {
                      setBlackListModalData({
                        blacklistReason: row.blacklistReason,
                        blacklistedBy: row.blacklistedBy,
                      });
                      setIsAlreadyBlackListModal(true);
                    } else {
                      const payload = {
                        eventId: row.eventId,
                        is_blackList: true,
                        row: row,
                      };
                      setBlackListModalData(payload);
                      setIsBlackListModal(true);
                    }
                  }}
                >
                  BlackList Event
                </Button>
                <Button
                  className="problematic_btn"
                  variant="primary"
                  onClick={() => {
                    setEventDBId(row.eventDBId);
                    setIsBlackList(row.is_blackList);
                    setBlacklistedSections(row.blacklistedSections);
                    blackListData = row.blackListData;
                    setBlackListSectionModal(true);
                  }}
                >
                  BlackList Section
                </Button>
              </>
            )}
          </span>
        </div>
        {from === "tempErrorOrders" ? (
          <div className="expand_row_inner">
            <label>Busted</label>
            <span className="row_val">
              <Button
                className="problematic_btn"
                variant="primary"
                onClick={() => {
                  setBustedOrderListingId(row.listingId);
                  setIsBustedOrderModal(true);
                }}
              >
                Mark as Busted
              </Button>
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const onCloseBlackListModal = () => {
    setErroMessage("");
    setBlacklistReasonSelected("");
    setBlacklistReason("");
    setBlackListModalData(null);
    setIsBlackListModal(false);
    setBlackListPOS([]);
    setBlackListFromError("");
    setStartDate(null);
  };

  const onOkBlackListModal = () => {
    // Check for selection is whether Other is yes check for reason or else take selection
    const reason =
      blacklistReasonSelected === "Other"
        ? blacklistReason
        : blacklistReasonSelected;
    if (blackListModalData.is_blackList && !reason) {
      setErroMessage("Please specify blacklist reason!");
      return;
    }

    if (blackListModalData.is_blackList && !blackListPOS.length) {
      setBlackListFromError("Please specify POS to blacklist from");
      return;
    }

    // Update BlackList Event(s)
    updateIsBlackListRequest({
      eventId: [blackListModalData.row.eventDBId],
      is_blackList: blackListPOS.length > 0 ? true : false,
      blacklistReason: reason,
      blackListFrom: blackListPOS,
      blacklistTillDate:
        blackListPOS.length && startDate
          ? moment(startDate)
              .utc()
              .add(23, "hours")
              .add(59, "minutes")
              .add(59, "seconds")
              .format()
          : null,
    });

    onCloseBlackListModal();
  };

  if (type === TYPE_TRANSFER_LISTING) {
    return (
      <div className="animated">
        {/* {isNotEmpty ? ( */}
        <BootstrapTable
          data={data}
          version="4"
          striped
          hover
          pagination
          options={options}
          trClassName={trClassName}
          selectRow={selectRow}
          expandableRow={isExpandRow}
          expandComponent={expandRow}
          expandColumnOptions={{ expandColumnVisible: true }}
          deleteRow
          search
        >
          <TableHeaderColumn dataField="listingId" isKey hidden>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            width="12%"
            dataField="eventId"
            dataFormat={newUrlFormatter}
          >
            EventID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataFormat={detailsFormatter}
            dataField="eventDetails"
            sort={"asc"}
            dataSort
            sortFunc={dateSortFuncForEvent}
          >
            Event Details
          </TableHeaderColumn>
          <TableHeaderColumn width="25%" dataFormat={sectionFormatter}>
            Ticket Details
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventName" hidden>
            EventName
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventAddress" hidden>
            Venue
          </TableHeaderColumn>
          <TableHeaderColumn dataField="invoiceId" hidden>
            InvoiceId
          </TableHeaderColumn>
          <TableHeaderColumn dataField="customerDisplayName" hidden>
            CustomerDisplayName
          </TableHeaderColumn>
          {actions && actions()}
        </BootstrapTable>
        {/* ) : (  <Spinner />
         )} */}
        {isBlackListModal ? (
          <BlackListModal
            isBlackListModal={isBlackListModal}
            onCloseBlackListModal={onCloseBlackListModal}
            onOkBlackListModal={onOkBlackListModal}
            blackListModalData={blackListModalData}
            blacklistReasonSelected={blacklistReasonSelected}
            setBlacklistReasonSelected={setBlacklistReasonSelected}
            blacklistReason={blacklistReason}
            setBlacklistReason={setBlacklistReason}
            erroMessage={erroMessage}
            setErroMessage={setErroMessage}
            blackListPOS={blackListPOS}
            setBlackListPOS={setBlackListPOS}
            blackListFromError={blackListFromError}
            setBlackListFromError={setBlackListFromError}
            setStartDate={setStartDate}
            startDate={startDate}
          />
        ) : (
          ""
        )}

        {blackListSectionModel ? (
          <BlackListSection
            isBlackListingFetching={isBlackListingFetching}
            isAddBlackListFetching={isAddBlackListFetching}
            addBlackListPriceSectionRequest={addBlackListPriceSectionRequest}
            FetchBlackListPriceSectionRequest={
              FetchBlackListPriceSectionRequest
            }
            updateIsBlackListRequest={updateIsBlackListRequest}
            blackListInfo={blackListInfo}
            eventDBId={eventDBId}
            blackListData={blackListData}
            is_blackList={is_blackList}
            blacklistedSections={blacklistedSections}
            isBlackListModal={(isBlackListModalOpen) =>
              setBlackListSectionModal(isBlackListModalOpen)
            }
          />
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <div className="animated">
        {/* {!showSpinner ? ( */}
        <BootstrapTable
          data={
            showComplicatedOrders
              ? data.filter((listing) => listing.isComplicatedOrder === true)
              : data
          }
          version="4"
          striped
          hover
          pagination
          options={options}
          // trStyle={trStyle}
          trClassName={trClassName}
          selectRow={selectRow}
          expandableRow={isExpandRow}
          expandComponent={expandRow}
          expandColumnOptions={{ expandColumnVisible: true }}
          deleteRow
          search
        >
          <TableHeaderColumn dataField="listingId" isKey hidden>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            width="12%"
            dataField="eventId"
            dataFormat={newUrlFormatter}
          >
            EventID
          </TableHeaderColumn>
          {/* <TableHeaderColumn
          dataField="ticketMasterUrl"
          dataFormat={urlFormatter("TicketMaster")}
        >
          TicketMasterUrl
        </TableHeaderColumn> */}
          <TableHeaderColumn
            dataFormat={detailsFormatter}
            dataField="eventDetails"
            sort={"asc"}
            dataSort
            sortFunc={dateSortFuncForEvent}
          >
            Event Details
          </TableHeaderColumn>
          <TableHeaderColumn width="25%" dataFormat={sectionFormatter}>
            Ticket Details
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventName" hidden>
            EventName
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventAddress" hidden>
            Venue
          </TableHeaderColumn>
          <TableHeaderColumn dataField="invoiceId" hidden>
            invoiceId
          </TableHeaderColumn>
          <TableHeaderColumn dataField="externalReference" hidden>
            externalReference
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventId" hidden>
            eventId
          </TableHeaderColumn>
          <TableHeaderColumn dataField="customerDisplayName" hidden>
            CustomerDisplayName
          </TableHeaderColumn>
          {/* <TableHeaderColumn dataField="eventDate" hidden>EventDate</TableHeaderColumn> */}
          {/* <TableHeaderColumn dataField="eventName">EventName</TableHeaderColumn>
        <TableHeaderColumn dataField="eventAddress">Venue</TableHeaderColumn>
        <TableHeaderColumn dataField="eventDate">EventDate</TableHeaderColumn>
        <TableHeaderColumn dataField="seat">Seat</TableHeaderColumn>
        <TableHeaderColumn dataField="quantitySold">Qty Sold</TableHeaderColumn>
        <TableHeaderColumn dataField="saleTime">SaleTime</TableHeaderColumn>
        <TableHeaderColumn
          dataField="invoiceId"
          dataFormat={urlFormatter("InvoceIdUrl")}
        >
          InvoiceId
        </TableHeaderColumn>
        <TableHeaderColumn dataField="problemNotes">
          ProblemNotes
        </TableHeaderColumn>
        {type === TYPE_TRANSFER_LISTING && (
          <TableHeaderColumn dataField="orderNum">OrderNum</TableHeaderColumn>
        )} */}
          {/* {type === TYPE_SALE_LISTING && (
          <TableHeaderColumn dataField="currentlyTryingToBuy">
            CurrentlyTryingToBuy
          </TableHeaderColumn>
        )} */}
          {/* {type === TYPE_SALE_LISTING && (
          <TableHeaderColumn dataField="reasonProblemBuying">
            ReasonProblemBuying
          </TableHeaderColumn>
        )}*/}
          <TableHeaderColumn width="12%" dataFormat={TMAndGAFormatter}>
            TMRowsBack/GA availability
          </TableHeaderColumn>
          {/* <TableHeaderColumn
          width="10%"
          dataField="baseCost"
          dataFormat={priceFormat}
        >
          BaseCost
        </TableHeaderColumn> */}
          {actions && actions()}
        </BootstrapTable>
        {/* ) : (
          <Spinner />
        )} */}

        {isBlackListModal ? (
          <BlackListModal
            isBlackListModal={isBlackListModal}
            onCloseBlackListModal={onCloseBlackListModal}
            onOkBlackListModal={onOkBlackListModal}
            blackListModalData={blackListModalData}
            blacklistReasonSelected={blacklistReasonSelected}
            setBlacklistReasonSelected={setBlacklistReasonSelected}
            blacklistReason={blacklistReason}
            setBlacklistReason={setBlacklistReason}
            erroMessage={erroMessage}
            setErroMessage={setErroMessage}
            blackListPOS={blackListPOS}
            setBlackListPOS={setBlackListPOS}
            blackListFromError={blackListFromError}
            setBlackListFromError={setBlackListFromError}
            setStartDate={setStartDate}
            startDate={startDate}
          />
        ) : (
          ""
        )}

        {isBustedOrderModal && (
          <BustedOrderModal
            isModalOpen={isBustedOrderModal}
            onCloseBustedModal={onCloseBustedModal}
            onOkBustedModal={onOkBustedModal}
            bustedOrderNote={bustedOrderNote}
            setBustedOrderNote={setBustedOrderNote}
            penaltyAmount={penaltyAmount}
            setPenaltyAmount={setPenaltyAmount}
          />
        )}

        {blackListSectionModel ? (
          <BlackListSection
            isBlackListingFetching={isBlackListingFetching}
            isAddBlackListFetching={isAddBlackListFetching}
            addBlackListPriceSectionRequest={addBlackListPriceSectionRequest}
            FetchBlackListPriceSectionRequest={
              FetchBlackListPriceSectionRequest
            }
            updateIsBlackListRequest={updateIsBlackListRequest}
            blackListInfo={blackListInfo}
            eventDBId={eventDBId}
            blackListData={blackListData}
            is_blackList={is_blackList}
            blacklistedSections={blacklistedSections}
            isBlackListModal={(isBlackListModalOpen) =>
              setBlackListSectionModal(isBlackListModalOpen)
            }
          />
        ) : (
          ""
        )}

        {isAlreadyBlackListModal && (
          <AlertModal
            modalHeader={"This event is already blacklisted"}
            isOpen={isAlreadyBlackListModal}
            onOk={() => {
              setBlackListModalData(null);
              setIsAlreadyBlackListModal(false);
            }}
            hideCancel={true}
          >
            <div className="tbl_main cm_tbl_btn_main">
              <div className="inner_tbl">
                <BootstrapTable
                  data={[blackListModalData]}
                  version="4"
                  striped
                  hover
                >
                  <TableHeaderColumn
                    expandable={false}
                    dataField="blacklistReason"
                  >
                    Blacklisted Reason
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    isKey
                    expandable={false}
                    dataField="blacklistedBy"
                  >
                    Blacklisted By
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </AlertModal>
        )}
      </div>
    );
  }
};

export default Table;
