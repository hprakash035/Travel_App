sap.ui.define([



    "sap/ui/core/mvc/Controller",

    // "sap/ui/core/mvc/Controller/View3",

    "sap/m/MessageToast",



    "sap/ui/core/Fragment",



    "sap/ui/model/Filter",



    "sap/ui/model/FilterOperator",

    "sap/ui/core/UIComponent"



],



    /**

 

     * @param {typeof sap.ui.core.mvc.Controller} Controller

 

     */



    function (Controller, MessageToast, Fragment, Filter, FilterOperator, UIComponent) {



        "use strict";



        var travelType;

        var travelMode;

        var NumberOfPassenger;

        var tripType;

        var retDate;

        var retMonth;

        var retYear;

        var arrDate;

        var arrMonth;

        var arrYear;



        return Controller.extend("probasicfiori.controller.View3", {



            onInit: function (oEvent) {

                // var rejectBtn = this.getView().byId("_IDGenMultiInput1");

                //     var rejectBtn = this.getView().byId("_IDGenMultiInput1").setEnabled(false);

                //     if(rejectBtn.getVisible()) {

                //        rejectBtn.setVisible(false);

                //    }

                //    abc.setEnabled(false);

                // location.reload();

                this.getView().byId("Customer_input").setEnabled(false)
                sap.ui.core.UIComponent.getRouterFor(this).getRoute('RouteView3').attachPatternMatched(this._onRouteMatched, this)
            },
            backButton: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                oRouter.navTo("RouteView2")

                location.reload()

            },
            _onRouteMatched: function (oEvent) {
                //  var component = this.getOwnerComponent();

                //  component.refreshBinding();

                travelType = oEvent.mParameters.arguments.travelType;

                travelMode = oEvent.mParameters.arguments.travelMode;

                NumberOfPassenger = oEvent.mParameters.arguments.NumberOfPassenger;

                tripType = oEvent.mParameters.arguments.tripType;



                for (let index = 0; index < NumberOfPassenger; index++) {

                    let field = this.getView().byId("_IDGenSimpleForm2");

                    console.log(field);

                    field.addContent(new sap.m.MultiInput({

                        width: "300px",



                    }).setValue(""));

                }
            },

            destination: function () {

                var origin = this.getView().byId("city").getSelectedItem().getText();

                var destination = this.getView().byId("city2").getSelectedItem().getText()

                if (origin == destination) {

                    alert("Origin or Destination can't be same")

                }

            },



            handleChange: function (oEvent) {

                //     var oDatePicker = this.getView().byId("DP1"); // Replace with your DatePicker's ID

                //     var selectedDate = oDatePicker.getValue();

                //    console.log(selectedDate);

                // console.log("hello");

                // alert("hello")

                //git checking

                var oDatePicker = oEvent.getSource();

                var selectedDate = oDatePicker.getDateValue();

                // console.log("Selected Date:", selectedDate);

                var formattedDate = sap.ui.core.format.DateFormat.getDateInstance().format(selectedDate);

                // console.log("Formatted Date:", formattedDate);

                let date = new Date(formattedDate);
                arrDate = date.getDate()
                arrMonth = (date.getMonth()) + 1
                arrYear = date.getFullYear()
                console.log(arrDate);
                console.log(arrMonth);
                console.log(arrYear);
                // }
                //    return "";
            },
            handleChange1: function (oEvent) {
                var oDatePicker = oEvent.getSource();
                var selectedDate = oDatePicker.getDateValue();
                // console.log("Selected Date:", selectedDate);
                var formattedDate = sap.ui.core.format.DateFormat.getDateInstance().format(selectedDate);
                // console.log("Formatted Date:", formattedDate);
                let date = new Date(formattedDate);
                retDate = date.getDate()
                retMonth = (date.getMonth()) + 1
                retYear = date.getFullYear()
                if (retMonth == 1 || retMonth == 3 || retMonth == 5 || retMonth == 7 || retMonth == 8 || retMonth == 10 || retMonth == 12) {



                    var NumberOfmonth = (retMonth - arrMonth) * 31

                }

                else if (retMonth == 4 || retMonth == 6 || retMonth == 9 || retMonth == 11) {

                    var NumberOfmonth = (retMonth - arrMonth) * 30

                }

                else if (retMonth == 2) {

                    var NumberOfmonth = (retMonth - arrMonth) * 28

                }

                var NumberOfdays = (retDate - arrDate) + NumberOfmonth

                if (NumberOfdays < 0) {

                    alert("Return date can't be backDate")

                }

                else if (NumberOfdays == 0) {

                    this.getView().byId("_IDGenInput1").setValue(NumberOfdays)

                }

                else if (NumberOfdays >= 1) {

                    this.getView().byId("_IDGenInput1").setValue(NumberOfdays)

                    this.getView().byId("_IDGenSwitch1").setState(true)

                }

                console.log(retDate);

                console.log(retMonth);

                console.log(retYear);

                console.log(NumberOfdays);



            },



            hhh: function () {

                console.log(this.getView().byId("_IDGenSwitch1").getState());

            },



            billable: function () {

                var billable_value = this.getView().byId("billable_value").getSelectedItem().getText();

                if (billable_value == "Yes") {

                    this.getView().byId("Customer_input").setEnabled(true)

                }

                else {

                    this.getView().byId("Customer_input").setEnabled(false)



                }

            },





            onValueHelpClose: function (oEvent) {



                var oSelectedItem = oEvent.getParameter("selectedItem");



                oEvent.getSource().getBinding("items").filter([]);



                if (!oSelectedItem) {







                    return;



                }







                this.byId("singleCondition").setValue(oSelectedItem.getTitle());



            },



            onValueHelpSearch: function (oEvent) {



                var sValue = oEvent.getParameter("value");



                var oFilter = new Filter("passengerName", FilterOperator.Contains, sValue);



                oEvent.getSource().getBinding("items").filter([oFilter]);



            },



            onOpenDialog: function () {







                // create dialog lazily



                if (!this.pDialog) {



                    this.pDialog = this.loadFragment({



                        name: "probasicfiori.view.dialog"







                    });



                }



                this.pDialog.then(function (oDialog) {



                    oDialog.open();



                });



            },











            onSubmit: function () {



                var ID = this.getView().byId("").getValue();



                var name = this.getView().byId("").getValue();



                var data = {



                    ID: parseInt(ID),



                    name: name



                };



                var odataModel = this.getOwnercomponent().getModel();



                odataModel.create("/Travel", data, {



                    success: function (data, response) {



                        MessageToast.show("Successfully created");



                    },



                    error: function (error) {



                        MessageToast.show("Error while creating data");



                    }



                });



            }



        });



    });