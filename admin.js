// =========================
// BEYOND TRAILS ADMIN PANEL
// =========================


/* =========================
   LOAD BOOKINGS
========================= */

async function loadBookings() {

    try {

        const response =
            await fetch("/api/bookings");


        const result =
            await response.json();


        if (!result.success) {

            console.error(
                "Unable to load bookings."
            );

            return;

        }


        displayBookings(result.bookings);

    } catch (error) {

        console.error(
            "Admin Panel Error:",
            error
        );

    }

}


/* =========================
   DISPLAY BOOKINGS
========================= */

function displayBookings(bookings) {

    const tableBody =
        document.getElementById(
            "bookingTableBody"
        );


    const totalBookings =
        document.getElementById(
            "totalBookings"
        );

    const pendingBookings =
        document.getElementById(
            "pendingBookings"
        );

    const confirmedBookings =
        document.getElementById(
            "confirmedBookings"
        );

    const cancelledBookings =
        document.getElementById(
            "cancelledBookings"
        );


    /* =========================
       UPDATE STATISTICS
    ========================= */

    totalBookings.textContent =
        bookings.length;


    pendingBookings.textContent =
        bookings.filter(
            booking =>
                booking.bookingStatus === "Pending"
        ).length;


    confirmedBookings.textContent =
        bookings.filter(
            booking =>
                booking.bookingStatus === "Confirmed"
        ).length;


    cancelledBookings.textContent =
        bookings.filter(
            booking =>
                booking.bookingStatus === "Cancelled"
        ).length;


    /* =========================
       EMPTY BOOKINGS
    ========================= */

    if (bookings.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="6">

                    No bookings found.

                </td>

            </tr>

        `;

        return;

    }


    /* =========================
       CREATE BOOKING ROWS
    ========================= */

    tableBody.innerHTML =
        bookings.map(booking => `

            <tr>

                <td>

                    <strong>
                        ${booking.name}
                    </strong>

                    <small>
                        ${booking.phone}
                    </small>

                </td>


                <td>

                    <strong>
                        ${booking.bookingItem}
                    </strong>

                    <small>
                        ${booking.bookingType}
                    </small>

                </td>


                <td>

                    ${booking.preferredDate}

                </td>


                <td>

                    <strong>
                        ${booking.estimatedPrice}
                    </strong>

                </td>


                <td>

                    <span class="status-badge ${booking.bookingStatus.toLowerCase()}">

                        ${booking.bookingStatus}

                    </span>

                </td>


                <td>

                    <button
                        class="admin-action-btn"
                        onclick="viewBooking(${booking.bookingId})"
                    >

                        VIEW

                    </button>

                </td>

            </tr>

        `).join("");

}


/* =========================
   VIEW BOOKING
========================= */

async function viewBooking(bookingId) {

    try {

        const response =
            await fetch("/api/bookings");


        const result =
            await response.json();


        const booking =
            result.bookings.find(
                item =>
                    item.bookingId === bookingId
            );


        if (!booking) {

            alert(
                "Booking not found."
            );

            return;

        }


        /* =========================
           GET MODAL ELEMENTS
        ========================= */

        const bookingModal =
            document.getElementById(
                "bookingModal"
            );

        const modalBookingTitle =
            document.getElementById(
                "modalBookingTitle"
            );

        const modalCustomerName =
            document.getElementById(
                "modalCustomerName"
            );

        const modalCustomerPhone =
            document.getElementById(
                "modalCustomerPhone"
            );

        const modalCustomerEmail =
            document.getElementById(
                "modalCustomerEmail"
            );

        const modalBookingType =
            document.getElementById(
                "modalBookingType"
            );

        const modalBookingItem =
            document.getElementById(
                "modalBookingItem"
            );

        const modalBookingDate =
            document.getElementById(
                "modalBookingDate"
            );

        const modalBookingAmount =
            document.getElementById(
                "modalBookingAmount"
            );

        const modalBookingStatus =
            document.getElementById(
                "modalBookingStatus"
            );


        /* =========================
           PUT BOOKING DATA IN MODAL
        ========================= */

        modalBookingTitle.textContent =
            booking.bookingItem;

        modalCustomerName.textContent =
            booking.name;

        modalCustomerPhone.textContent =
            booking.phone;

        modalCustomerEmail.textContent =
            booking.email;

        modalBookingType.textContent =
            booking.bookingType;

        modalBookingItem.textContent =
            booking.bookingItem;

        modalBookingDate.textContent =
            booking.preferredDate;

        modalBookingAmount.textContent =
            booking.estimatedPrice;

        modalBookingStatus.textContent =
            booking.bookingStatus;


        /* =========================
           SHOW MODAL
        ========================= */

        bookingModal.style.display =
            "flex";


        /* =========================
           CONFIRM BOOKING
        ========================= */

        const confirmButton =
            document.getElementById(
                "confirmBookingBtn"
            );

        confirmButton.onclick = function () {

            updateBookingStatus(
                booking.bookingId,
                "Confirmed"
            );

        };


        /* =========================
           CANCEL BOOKING
        ========================= */

        const cancelButton =
            document.getElementById(
                "cancelBookingBtn"
            );

        cancelButton.onclick = function () {

            updateBookingStatus(
                booking.bookingId,
                "Cancelled"
            );

        };

    } catch (error) {

        console.error(
            "Unable to view booking:",
            error
        );

    }

}


/* =========================
   CLOSE BOOKING MODAL
========================= */

const closeBookingModal =
    document.getElementById(
        "closeBookingModal"
    );


if (closeBookingModal) {

    closeBookingModal.addEventListener(
        "click",
        function () {

            document.getElementById(
                "bookingModal"
            ).style.display = "none";

        }
    );

}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

const bookingModal =
    document.getElementById(
        "bookingModal"
    );


if (bookingModal) {

    bookingModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                bookingModal
            ) {

                bookingModal.style.display =
                    "none";

            }

        }
    );

}

/* =========================
   UPDATE BOOKING STATUS
========================= */

async function updateBookingStatus(
    bookingId,
    newStatus
) {

    const confirmation =
        confirm(
            `Are you sure you want to mark this booking as ${newStatus}?`
        );


    if (!confirmation) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/bookings/${bookingId}/status`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        status: newStatus

                    })

                }
            );


        const result =
            await response.json();


        /* =========================
           CHECK RESPONSE
        ========================= */

        if (!result.success) {

            alert(
                result.message ||
                "Unable to update booking."
            );

            return;

        }


        /* =========================
           CLOSE MODAL
        ========================= */

        const bookingModal =
            document.getElementById(
                "bookingModal"
            );


        if (bookingModal) {

            bookingModal.style.display =
                "none";

        }


        /* =========================
           REFRESH BOOKINGS
        ========================= */

        await loadBookings();


        /* =========================
           SUCCESS MESSAGE
        ========================= */

        alert(
            `Booking has been marked as ${newStatus}.`
        );


    } catch (error) {

        console.error(
            "Status Update Error:",
            error
        );


        alert(
            "Unable to update booking status."
        );

    }

}

/* =========================
   LOAD ADMIN PANEL
========================= */

loadBookings();