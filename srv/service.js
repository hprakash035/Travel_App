const cds = require('@sap/cds');

module.exports = (srv) => {

    srv.on('resolve', 'Travel', async (req) => {

        let data = await req.data;

        const tx = cds.transaction(req);

        try {

            tx.run(

                INSERT = {

                    into: { ref: ["Travel.Travel"] },

                    columns: ["travelId",
                        "empId_Empid",
                        "empName_Empid",
                        "origin",
                        "destination",
                        "dateOfDeparture",
                        "dateOfArrival",
                        "dateOfReturn",
                        "description",
                        "price",
                        "travelStatus",
                        "noOfDays",
                        "noOfPassengers",
                        "passengerName",
                        "travelType",
                        "travelMode",
                        "RoundTrip",
                        "Accomandation",
                        "billable"],

                    values: [data.travelId,
                    data.empId_Empid,
                    data.empName_Empid,
                    data.origin,
                    data.destination,
                    data.dateOfDeparture,
                    data.dateOfArrival,
                    data.dateOfReturn,
                    data.description,
                    data.price,
                    data.travelStatus,
                    data.noOfDays,
                    data.noOfPassengers,
                    data.passengerName,
                    data.travelType,
                    data.travelMode,
                    data.RoundTrip,
                    data.Accomandation,
                    data.billable]

                }

            );

            await tx.send;
            console.log(data);
            console.log('Success');

        }

        catch (error) {



            console.error('Error');

        }

    });

};




