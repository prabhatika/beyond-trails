// =========================
// BEYOND TRAILS BACKEND SERVER
// =========================

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = 3000;


// =========================
// BOOKING FILE
// =========================

const bookingsFile =
    path.join(__dirname, "bookings.json");

// =========================
// TRIP CAPACITY
// =========================

const tripCapacities = {

    "Sandakphu Trek": 8,

    "Yelbong Trek": 6,

    "Hilley – Varsey": 8,

    "Lepchajagat": 12,

    "Night Camping": 10,

    "Dzongri Trek": 5,

    "Tinchuley Camping": 10

};
// =========================
// MIDDLEWARE
// =========================

app.use(express.json());


// =========================
// SERVE FRONTEND FILES
// =========================

app.use(express.static(__dirname));


// =========================
// BACKEND TEST ROUTE
// =========================

app.get("/api/test", (req, res) => {

    res.json({

        success: true,

        message:
            "Beyond Trails backend is working!"

    });

});

// =========================
// GET ALL BOOKINGS
// =========================

app.get("/api/bookings", (req, res) => {

    let bookings = [];

    try {

        const existingData =
            fs.readFileSync(
                bookingsFile,
                "utf8"
            );

        bookings =
            JSON.parse(existingData);

    } catch (error) {

        bookings = [];

    }


    res.json({

        success: true,

        bookings: bookings

    });

});

// =========================
// BOOKING API
// =========================

app.post("/api/bookings", (req, res) => {

    const bookingData = req.body;


    console.log("New Booking Received:");

    console.log(bookingData);


    // =========================
    // READ EXISTING BOOKINGS
    // =========================

    let bookings = [];


    try {

        const existingData =
            fs.readFileSync(
                bookingsFile,
                "utf8"
            );

        bookings =
            JSON.parse(existingData);

    } catch (error) {

        bookings = [];

    }
    // =========================
// CHECK TRIP AVAILABILITY
// =========================

if (bookingData.bookingType === "trip") {

    const tripName =
        bookingData.bookingItem;

    const requestedPeople =
        Number(bookingData.tripPeople || 0);

    const tripCapacity =
        tripCapacities[tripName];


    /* =========================
       CHECK TRIP EXISTS
    ========================= */

    if (!tripCapacity) {

        return res.status(400).json({

            success: false,

            message:
                "Selected trip was not found."

        });

    }


    /* =========================
       CALCULATE CONFIRMED PEOPLE
    ========================= */

    const confirmedPeople =
        bookings
            .filter(
                booking =>
                    booking.bookingType === "trip" &&
                    booking.bookingItem === tripName &&
                    booking.bookingStatus === "Confirmed"
            )
            .reduce(
                (total, booking) =>
                    total +
                    Number(
                        booking.tripPeople || 0
                    ),
                0
            );


    const availableSeats =
        tripCapacity -
        confirmedPeople;


    /* =========================
       CHECK AVAILABLE SEATS
    ========================= */

    if (
        requestedPeople <= 0 ||
        requestedPeople > availableSeats
    ) {

        return res.status(400).json({

            success: false,

            message:
                availableSeats > 0
                    ? `Only ${availableSeats} seats are available for this trip.`
                    : "Sorry, this trip is fully booked."

        });

    }

}

    // =========================
    // ADD NEW BOOKING
    // =========================

    bookings.push({

        ...bookingData,

        bookingId:
            Date.now(),

        bookingStatus:
            "Pending",

        createdAt:
            new Date().toISOString()

    });


    // =========================
    // SAVE BOOKINGS
    // =========================

    fs.writeFileSync(

        bookingsFile,

        JSON.stringify(
            bookings,
            null,
            4
        )

    );


    // =========================
    // SEND RESPONSE
    // =========================

    res.json({

        success: true,

        message:
            "Booking saved successfully!",

        booking:
            bookingData

    });

});

// =========================
// UPDATE BOOKING STATUS
// =========================

app.put("/api/bookings/:id/status", (req, res) => {

    const bookingId =
        Number(req.params.id);

    const newStatus =
        req.body.status;


    // =========================
    // CHECK STATUS
    // =========================

    if (
        newStatus !== "Confirmed" &&
        newStatus !== "Cancelled" &&
        newStatus !== "Pending"
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid booking status."

        });

    }


    // =========================
    // READ BOOKINGS
    // =========================

    let bookings = [];


    try {

        const existingData =
            fs.readFileSync(
                bookingsFile,
                "utf8"
            );

        bookings =
            JSON.parse(existingData);

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Unable to read bookings."

        });

    }


    // =========================
    // FIND BOOKING
    // =========================

    const booking =
        bookings.find(
            item =>
                item.bookingId === bookingId
        );


    if (!booking) {

        return res.status(404).json({

            success: false,

            message:
                "Booking not found."

        });

    }


    // =========================
    // UPDATE STATUS
    // =========================

    booking.bookingStatus =
        newStatus;


    // =========================
    // SAVE BOOKINGS
    // =========================

    try {

        fs.writeFileSync(

            bookingsFile,

            JSON.stringify(
                bookings,
                null,
                4
            )

        );

    } catch (error) {

        return res.status(500).json({

            success: false,

            message:
                "Unable to save booking."

        });

    }


    // =========================
    // SEND RESPONSE
    // =========================

    res.json({

        success: true,

        message:
            "Booking status updated successfully!",

        booking:
            booking

    });

});

// =========================
// GET TRIP SEAT AVAILABILITY
// =========================

app.get("/api/trips/availability", (req, res) => {

    let bookings = [];

    try {

        const existingData =
            fs.readFileSync(
                bookingsFile,
                "utf8"
            );

        bookings =
            JSON.parse(existingData);

    } catch (error) {

        bookings = [];

    }


    // =========================
    // CALCULATE AVAILABLE SEATS
    // =========================

    const availability =
        Object.entries(tripCapacities).map(
            ([tripName, capacity]) => {

                const confirmedPeople =
                    bookings
                        .filter(
                            booking =>
                                booking.bookingType === "trip" &&
                                booking.bookingItem === tripName &&
                                booking.bookingStatus === "Confirmed"
                        )
                        .reduce(
                            (total, booking) =>
                                total +
                                Number(booking.tripPeople || 0),
                            0
                        );


                const availableSeats =
                    Math.max(
                        capacity - confirmedPeople,
                        0
                    );


                return {

                    tripName: tripName,

                    capacity: capacity,

                    confirmedPeople:
                        confirmedPeople,

                    availableSeats:
                        availableSeats,

                    isFull:
                        availableSeats === 0

                };

            }
        );


    // =========================
    // SEND AVAILABILITY
    // =========================

    res.json({

        success: true,

        trips: availability

    });

});

// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(
        `Beyond Trails server is running at http://localhost:${PORT}`
    );

});