/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", function () {

        menuToggle.classList.toggle("active");

        mobileMenu.classList.toggle("active");

    });

}


/* =========================================================
   SEE MORE TRIPS — TOGGLE
========================================================= */

const seeMoreButton =
    document.getElementById("seeMoreTrips");

const extraTrips =
    document.querySelectorAll(".extra-trip");

if (seeMoreButton && extraTrips.length > 0) {

    seeMoreButton.addEventListener("click", function () {

        extraTrips.forEach(function (trip) {

            if (trip.classList.contains("show-trip")) {

                trip.classList.remove("show-trip");

            } else {

                trip.classList.add("show-trip");

            }

        });


        /* =========================
           CHANGE BUTTON TEXT
        ========================= */

        if (
            extraTrips[0].classList.contains("show-trip")
        ) {

            seeMoreButton.innerHTML =
                'SHOW LESS <span>↑</span>';

        } else {

            seeMoreButton.innerHTML =
                'SEE MORE TRIPS <span>→</span>';

        }

    });

}

/* =========================================================
   BOOKING FORM FUNCTIONALITY — BACKEND CONNECTED
========================================================= */

const bookingForm =
    document.getElementById("bookingForm");

const bookingSuccess =
    document.getElementById("bookingSuccess");


if (bookingForm && bookingSuccess) {

    bookingForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* =========================
           GET BOOKING DETAILS
        ========================= */

        const name =
            bookingForm.querySelector('[name="name"]')?.value || "";

        const phone =
            bookingForm.querySelector('[name="phone"]')?.value || "";

        const email =
            bookingForm.querySelector('[name="email"]')?.value || "";

        const bookingType =
            document.getElementById("bookingType")?.value || "";

        const bookingItem =
            document.getElementById("bookingItem")?.value || "";

        const preferredDate =
            bookingForm.querySelector('[name="date"]')?.value || "";

        const message =
            bookingForm.querySelector('[name="message"]')?.value || "";


        /* =========================
           TRIP / STAY DETAILS
        ========================= */

        const tripPeople =
            document.getElementById("tripPeople")?.value || "1";

        const stayRooms =
            document.getElementById("stayRooms")?.value || "1";

        const stayNights =
            document.getElementById("stayNights")?.value || "1";


        /* =========================
           ESTIMATED PRICE
        ========================= */

        const estimatedPrice =
            document.getElementById("bookingPrice")?.textContent || "₹0";


        /* =========================
           CREATE BOOKING DATA
        ========================= */

        const bookingData = {

            name: name,

            phone: phone,

            email: email,

            bookingType: bookingType,

            bookingItem: bookingItem,

            tripPeople:
                bookingType === "trip"
                    ? tripPeople
                    : "",

            stayRooms:
                bookingType === "stay"
                    ? stayRooms
                    : "",

            stayNights:
                bookingType === "stay"
                    ? stayNights
                    : "",

            preferredDate: preferredDate,

            estimatedPrice: estimatedPrice,

            message: message

        };


        /* =========================
           SEND BOOKING TO BACKEND
        ========================= */

        try {

            const response =
                await fetch("/api/bookings", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(bookingData)

                });


            const result =
                await response.json();


            /* =========================
               CHECK BACKEND RESPONSE
            ========================= */

            if (!result.success) {

                alert(
                    result.message ||
                    "Something went wrong. Please try again."
                );

                return;

            }


            /* =========================
               CREATE BOOKING SUMMARY
            ========================= */

            let bookingDetails = "";


            if (bookingType === "trip") {

                bookingDetails = `

                    <div class="summary-row">

                        <span>
                            Number of People
                        </span>

                        <strong>
                            ${tripPeople}
                        </strong>

                    </div>

                `;

            }


            if (bookingType === "stay") {

                bookingDetails = `

                    <div class="summary-row">

                        <span>
                            Number of Rooms
                        </span>

                        <strong>
                            ${stayRooms}
                        </strong>

                    </div>


                    <div class="summary-row">

                        <span>
                            Number of Nights
                        </span>

                        <strong>
                            ${stayNights}
                        </strong>

                    </div>

                `;

            }


            /* =========================
               SHOW BOOKING SUMMARY
            ========================= */

            bookingSuccess.innerHTML = `

                <div class="booking-success-content">


                    <div class="success-icon">
                        ✓
                    </div>


                    <h2>
                        Booking Submitted Successfully!
                    </h2>


                    <p class="success-message">

                        Thank you,
                        <strong>${name}</strong>.

                        Your booking request has been received.

                    </p>


                    <div class="booking-summary">


                        <h3>
                            Booking Summary
                        </h3>


                        <div class="summary-row">

                            <span>
                                Name
                            </span>

                            <strong>
                                ${name}
                            </strong>

                        </div>


                        <div class="summary-row">

                            <span>
                                Phone
                            </span>

                            <strong>
                                ${phone}
                            </strong>

                        </div>


                        <div class="summary-row">

                            <span>
                                Email
                            </span>

                            <strong>
                                ${email}
                            </strong>

                        </div>


                        <div class="summary-row">

                            <span>
                                Booking Type
                            </span>

                            <strong>
                                ${bookingType}
                            </strong>

                        </div>


                        <div class="summary-row">

                            <span>
                                Selected
                            </span>

                            <strong>
                                ${bookingItem}
                            </strong>

                        </div>


                        ${bookingDetails}


                        <div class="summary-row">

                            <span>
                                Preferred Date
                            </span>

                            <strong>
                                ${preferredDate}
                            </strong>

                        </div>


                        <div class="summary-total">

                            <span>
                                Estimated Total
                            </span>

                            <strong>
                                ${estimatedPrice}
                            </strong>

                        </div>


                    </div>


                    ${
                        message
                        ? `

                        <div class="booking-note">

                            <strong>
                                Your Message
                            </strong>

                            <p>
                                ${message}
                            </p>

                        </div>

                        `
                        : ""
                    }


                    <p class="confirmation-note">

                        We will contact you shortly
                        to confirm your booking.

                    </p>


                </div>

            `;


            /* =========================
               HIDE FORM
            ========================= */

            bookingForm.style.display =
                "none";


            /* =========================
               SHOW SUCCESS SECTION
            ========================= */

            bookingSuccess.style.setProperty(
                "display",
                "block",
                "important"
            );


            /* =========================
               SCROLL TO SUCCESS
            ========================= */

            bookingSuccess.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });


    /* =========================
   HANDLE BOOKING ERROR
========================= */

} catch (error) {

    console.error(
        "Booking Error:",
        error
    );


    alert(
        error.message ||
        "Something went wrong. Please try again."
    );

     }   
 });

}

/* =========================================================
   DYNAMIC TRIP DETAILS DATABASE
========================================================= */

const tripData = {


    /* =====================================================
       SANDAKPHU
    ===================================================== */

    sandakphu: {

        title: "Sandakphu Trek",

        category: "TREKKING",

        location: "West Bengal",

        duration: "6 Days / 5 Nights",

        price: "₹9,999",

        seats: "8 Seats",

        heroImage: "image/sandakphu.jpg",

        heroDescription:
            "Witness the majestic Kanchenjunga range, walk through cloud-kissed trails and experience the raw beauty of the Himalayas.",

        aboutTitle:
            "Discover Sandakphu",

        about: [
            "Sandakphu, the highest peak in West Bengal, is a dream destination for every mountain lover. This trek takes you through beautiful forests, charming villages and breathtaking Himalayan landscapes.",

            "The journey is a perfect blend of adventure, nature and serenity — where every step brings you closer to the clouds."
        ],

        difficulty: "Moderate to Difficult",

        bestSeason: "Mar – May<br>& Sep – Dec",

        maxAltitude: "11,930 ft",

        itineraryTitle:
            "Your 6-Day Journey",

        itinerary: [

            {
                day: "01",
                title: "NJP / Bagdogra → Manebhanjan",
                description:
                    "Drive from NJP / Bagdogra to Manebhanjan, the starting point of the Sandakphu Trek.",
                meta: [
                    "🚗 110 km drive",
                    "◷ 4–5 hours",
                    "▲ 7,100 ft"
                ]
            },

            {
                day: "02",
                title: "Manebhanjan → Tumling",
                subtitle: "via Chitrey",
                description:
                    "Begin the trek from Manebhanjan towards Tumling via Chitrey, passing through beautiful mountain trails and forests.",
                meta: [
                    "🥾 11 km trek",
                    "◷ 5–6 hours",
                    "▲ 9,600 ft"
                ]
            },

            {
                day: "03",
                title: "Tumling → Kalipokhri",
                description:
                    "Continue the trek through the beautiful high-altitude landscape towards Kalipokhri.",
                meta: [
                    "🥾 13–15 km trek",
                    "◷ 6–7 hours",
                    "▲ 10,400 ft"
                ]
            },

            {
                day: "04",
                title: "Kalipokhri → Sandakphu Summit",
                description:
                    "Trek towards the Sandakphu Summit, the highest point of West Bengal, and experience spectacular Himalayan views.",
                meta: [
                    "🥾 6 km trek",
                    "◷ 3–4 hours",
                    "▲ 11,930 ft"
                ]
            },

            {
                day: "05",
                title: "Sandakphu → Srikhola",
                subtitle: "via Gorkhey",
                description:
                    "Begin the long descent from Sandakphu towards Srikhola via the beautiful village of Gorkhey.",
                meta: [
                    "🥾 16 km descent",
                    "◷ 7–8 hours",
                    "▼ 6,900 ft"
                ]
            },

            {
                day: "06",
                title: "Srikhola → NJP / Bagdogra",
                description:
                    "Complete the journey with a drive back from Srikhola to NJP / Bagdogra.",
                meta: [
                    "🚗 110 km drive",
                    "◷ 6–7 hours",
                    "▼ Return to sea level"
                ]
            }

        ],

        included: [
            "Accommodation",
            "Meals during the trek",
            "Experienced trek leader",
            "Local transportation",
            "Basic first aid support"
        ],

        excluded: [
            "Train or flight tickets",
            "Personal expenses",
            "Travel insurance",
            "Personal trekking equipment",
            "Porter",
            "Permit fees (if any)",
            "Anything not mentioned above"
        ],

        gallery: [

            "image/sandakphu.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/6/6d/View_from_Sandakphu_%288655796176%29.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/f/f1/Sunrise_from_Sandakphu_%288652110340%29.jpg",

            "https://upload.wikimedia.org/wikipedia/commons/d/d5/Kangchenjunga_as_seen_from_sandakphu.jpg"

        ]

    },


    /* =====================================================
       LEPCHAJAGAT
    ===================================================== */

    lepchajagat: {

        title: "Lepchajagat",

        category: "WEEKEND ESCAPE",

        location: "West Bengal",

        duration: "2 Days / 1 Night",

        price: "₹2,499",

        seats: "12 Seats",

        heroImage: "image/lepchajagat.jpg",

        heroDescription:
            "Escape to a peaceful forest village surrounded by pine forests, mountain trails and the serene beauty of the Darjeeling hills.",

        aboutTitle:
            "Discover Lepchajagat",

        about: [
            "Lepchajagat is a serene forest village located at an altitude of 6,956 feet (2,123 meters), just 19 km away from the main Darjeeling hill town.",

            "This short mountain escape is perfect for those looking for peaceful village walks, forest trails, local food and a cozy homestay experience."
        ],

        difficulty: "Easy",

        bestSeason: "Oct – May",

        maxAltitude: "6,956 ft",

        itineraryTitle:
            "Your 2-Day Journey",

        itinerary: [

            {
                day: "01",
                title: "NJP → Lepchajagat",
                description:
                    "Drive from NJP to Lepchajagat and check in to a cozy local homestay. After lunch, head out for a peaceful village hike and explore the beautiful forested surroundings. In the evening, enjoy a warm campfire with chicken barbecue, good food and great company.",
                meta: [
                    "🚗 NJP to Lepchajagat",
                    "🥾 Village hike",
                    "🔥 Campfire & BBQ"
                ]
            },

            {
                day: "02",
                title: "Lepchajagat Sightseeing → NJP",
                description:
                    "Wake up to a beautiful mountain morning and enjoy breakfast at the homestay. Explore the local surroundings and scenic sightseeing spots before beginning the journey back to NJP by evening.",
                meta: [
                    "🌄 Sightseeing",
                    "🚗 Return journey",
                    "📍 Reach NJP by evening"
                ]
            }

        ],

        included: [
            "NJP to NJP transportation",
            "Meals",
            "Stay",
            "Food",
            "Guide"
        ],

        excluded: [
            "Train or flight tickets",
            "Personal expenses",
            "Travel insurance",
            "Anything not mentioned above"
        ],

        gallery: [

            "image/lepchajagat.jpg",

            "image/lepchajagat2.jpg",

            "image/lepchajagat1.jpg",

            "image/lepchajagat3.jpg"

        ]

    },


    /* =====================================================
       YELBONG
    ===================================================== */

    yelbong: {

        title: "Yelbong",

        category: "RIVER CANYON TREK",

        location: "Kalimpong, North Bengal",

        duration: "3 Days / 2 Nights",

        price: "₹4,499",

        seats: "6 Seats",

        heroImage: "image/yelbong.jpg",

        heroDescription:
            "Explore a remote offbeat village, camp beside the mountains and experience the raw beauty of North Bengal's famous river canyon.",

        aboutTitle:
            "Discover Yelbong",

        about: [
            "Yelbong is a remote, offbeat village in the Kalimpong district of West Bengal, famous for hosting North Bengal's only river canyon trek.",

            "From riverside camping and waterfalls to the spectacular canyon trail, this adventure brings together trekking, nature, village life and an unforgettable camping experience."
        ],

        difficulty: "Moderate",

        bestSeason: "Oct – May",

        maxAltitude: "Moderate Altitude",

        itineraryTitle:
            "Your 3-Day Journey",

        itinerary: [

            {
                day: "01",
                title: "New Mal Junction → Yelbong Village → Campsite",
                description:
                    "Drive from New Mal Junction to Yelbong Village and begin the trek towards the Yelbong campsite. After reaching the campsite, explore the surroundings and, if conditions permit, visit the beautiful Rainbow Waterfall. In the evening, enjoy a campfire followed by dinner and an overnight stay at the campsite.",
                meta: [
                    "🚗 New Mal Junction → Yelbong",
                    "🥾 Trek to campsite",
                    "🔥 Campfire & dinner"
                ]
            },

            {
                day: "02",
                title: "Yelbong River Canyon Trek",
                description:
                    "After breakfast, begin the main adventure — the Yelbong River Canyon Trek. Explore the spectacular canyon, river trails and surrounding natural landscape before trekking back towards Yelbong Village.",
                meta: [
                    "🥾 River canyon trek",
                    "🌊 River trail",
                    "🏡 Overnight homestay"
                ]
            },

            {
                day: "03",
                title: "Yelbong → Sightseeing → New Mal Junction",
                description:
                    "After breakfast, leave Yelbong and explore a couple of scenic sightseeing spots around the region before continuing the journey back to New Mal Junction.",
                meta: [
                    "🍳 Breakfast",
                    "🌄 Local sightseeing",
                    "🚗 Return to New Mal Junction"
                ]
            }

        ],

        included: [
            "Transportation as per itinerary",
            "Accommodation",
            "Meals",
            "Experienced trip leader",
            "Guide",
            "Basic first aid support"
        ],

        excluded: [
            "Train tickets",
            "Personal expenses",
            "Travel insurance",
            "Personal trekking equipment",
            "Anything not mentioned above"
        ],

        gallery: [

            "image/yelbong.jpg",

            "https://static2.tripoto.com/media/filter/tst/img/1747013/TripDocument/1604736895_4.jpg",

            "https://static2.tripoto.com/media/filter/tst/img/1747013/TripDocument/1604736894_5.jpg",

            "https://static2.tripoto.com/media/filter/tst/img/1747013/TripDocument/1604736892_6.jpg"

        ]

    },


    /* =====================================================
       HILLEY – VARSEY
    ===================================================== */

    hilley: {

        title: "Hilley – Varsey",

        category: "TREKKING",

        location: "Sikkim",

        duration: "3 Days / 2 Nights",

        price: "₹5,499",

        seats: "8 Seats",

        heroImage: "image/hilleyvarsey.jpg",

        heroDescription:
            "Walk through beautiful rhododendron forests and experience the peaceful charm of the Hilley to Varsey trail in West Sikkim.",

        aboutTitle:
            "Discover Hilley – Varsey",

        about: [
            "The Hilley – Varsey journey is a beautiful short Himalayan escape through peaceful forests and scenic mountain landscapes.",

            "With a relaxed first night at Okhrey and a rewarding trek from Hilley to Varsey, this trip is perfect for those looking for a refreshing mountain adventure."
        ],

        difficulty: "Easy to Moderate",

        bestSeason: "Mar – May",

        maxAltitude: "Approx. 10,000 ft",

        itineraryTitle:
            "Your 3-Day Journey",

        itinerary: [

            {
                day: "01",
                title: "NJP → Okhrey",
                description:
                    "Begin the journey from NJP and drive towards Okhrey, a peaceful mountain village in Sikkim. After reaching Okhrey, check in to the accommodation and spend the rest of the day relaxing and enjoying the mountain surroundings.",
                meta: [
                    "🚗 NJP → Okhrey",
                    "🏡 Homestay",
                    "🌄 Mountain evening"
                ]
            },

            {
                day: "02",
                title: "Okhrey → Hilley → Varsey",
                description:
                    "After breakfast, drive from Okhrey to Hilley, the starting point of the trek. From Hilley, begin the trek towards Varsey through beautiful forest trails and mountain landscapes.",
                meta: [
                    "🚗 Okhrey → Hilley",
                    "🥾 Hilley → Varsey",
                    "🏡 Overnight at Varsey"
                ]
            },

            {
                day: "03",
                title: "Varsey → Hilley → NJP",
                description:
                    "After breakfast, trek back from Varsey to Hilley. From Hilley, begin the direct drive back to NJP, bringing the mountain adventure to an end.",
                meta: [
                    "🥾 Varsey → Hilley",
                    "🚗 Hilley → NJP",
                    "🏁 Trip ends at NJP"
                ]
            }

        ],

        included: [
            "Transportation as per itinerary",
            "Accommodation",
            "Meals",
            "Experienced trip leader",
            "Guide",
            "Basic first aid support"
        ],

        excluded: [
            "Train or flight tickets",
            "Personal expenses",
            "Travel insurance",
            "Personal trekking equipment",
            "Anything not mentioned above"
        ],

        gallery: [

            "image/hilleyvarsey.jpg",

            "image/varsey2.jpg",

            "image/varsey1.jpg",

            "image/varsey3.jpg"

        ]

    },


    /* =====================================================
       NIGHT CAMPING
    ===================================================== */

    nightcamping: {

        title: "Night Camping",

        category: "SECRET RIVERSIDE CAMPING",

        location: "North Bengal • Secret Location",

        duration: "2 Days / 1 Night",

        price: "₹1,799",

        seats: "10 Seats",

        heroImage: "image/nigntcamping.jpg",

        heroDescription:
            "A secret riverside escape where the destination stays hidden until the adventure begins.",

        aboutTitle:
            "Discover the Secret Escape",

        about: [
            "An offbeat riverside camping experience where the destination remains a secret until the adventure begins.",

            "Escape the usual tourist spots and spend a night surrounded by nature, with tents by the river, a warm campfire, chicken barbecue, good food and an unforgettable night under the open sky."
        ],

        difficulty: "Easy",

        bestSeason: "Oct – May",

        maxAltitude: "Secret Location",

        itineraryTitle:
            "Your 2-Day Journey",

        itinerary: [

            {
                day: "01",
                title: "NJP → A Secret Place",
                description:
                    "Our adventure begins with a drive from NJP to a carefully selected secret riverside location somewhere in North Bengal. The exact destination will be decided by the admin based on the trip plan and current conditions. After reaching the location, explore the surrounding area and enjoy the riverside atmosphere. As evening falls, enjoy tent camping, a campfire, chicken barbecue, dinner and plenty of fun.",
                meta: [
                    "🚗 NJP → Secret Location",
                    "🏕️ Riverside camping",
                    "🔥 Campfire & BBQ"
                ]
            },

            {
                day: "02",
                title: "Riverside Morning → NJP",
                description:
                    "Wake up to a peaceful riverside morning and enjoy breakfast at the campsite. Spend some final moments enjoying the surroundings before packing up and beginning the journey back to NJP.",
                meta: [
                    "🌅 Riverside morning",
                    "🍳 Breakfast",
                    "🚗 Return to NJP"
                ]
            }

        ],

        included: [
            "NJP to NJP transportation",
            "Tent accommodation",
            "Meals",
            "Campfire",
            "Chicken barbecue",
            "Trip leader",
            "Basic first aid support"
        ],

        excluded: [
            "Train or flight tickets",
            "Personal expenses",
            "Travel insurance",
            "Personal camping equipment",
            "Anything not mentioned above"
        ],

        gallery: [

            "image/nigntcamping.jpg",

            "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80",

            "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80",

            "https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=80"

        ]

    },


    /* =====================================================
       DZONGRI
    ===================================================== */

    dzongri: {

        title: "Dzongri Trek",

        category: "ALPINE TREKKING",

        location: "Sikkim",

        duration: "6 Days / 5 Nights",

        price: "₹8,999",

        seats: "5 Seats",

        heroImage:
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85",

        heroDescription:
            "A classic Himalayan trek through dense forests, rhododendron trails and spectacular mountain landscapes, culminating in the breathtaking views from Dzongri Top.",

        aboutTitle:
            "Discover Dzongri",

        about: [
            "The Dzongri Trek is a classic alpine adventure in West Sikkim, reaching a maximum altitude of approximately 4,200 meters (13,780 feet) at Dzongri Top.",

            "Starting and ending at Yuksom, the historic first capital of Sikkim, the trek covers approximately 42–50 km through dense forests, rhododendron trails and spectacular Himalayan landscapes.",

            "The highlight of the journey is the breathtaking 360-degree panoramic sunrise view of Mt. Kanchenjunga, Mt. Pandim and the surrounding peaks from Dzongri Top."
        ],

        difficulty: "Moderate",

        bestSeason: "Mar – May<br>& Oct – Nov",

        maxAltitude: "4,200 m / 13,780 ft",

        itineraryTitle:
            "Your Dzongri Journey",

        itinerary: [

            {
                day: "01",
                title: "NJP / Bagdogra → Yuksom",
                description:
                    "Begin the adventure with a scenic drive from NJP or Bagdogra to Yuksom, the historic first capital of Sikkim. Surrounded by lush forests and mountains, Yuksom will be our base for the night.",
                meta: [
                    "🚗 NJP / Bagdogra → Yuksom",
                    "🏡 Overnight stay",
                    "📍 1,710 m"
                ]
            },

            {
                day: "02",
                title: "Yuksom → Sachen",
                description:
                    "After breakfast, begin the first day of trekking through dense Himalayan forests. The trail winds alongside mountain streams and crosses beautiful suspension bridges before reaching Sachen.",
                meta: [
                    "🥾 Forest trek",
                    "🌉 Suspension bridges",
                    "▲ 2,200 m"
                ]
            },

            {
                day: "03",
                title: "Sachen → Tshoka",
                subtitle: "via Bakhim",
                description:
                    "The trail gradually climbs through thick forests towards Bakhim and then continues to the beautiful mountain village of Tshoka. As you gain altitude, the landscape begins to change and the Himalayan views become more dramatic.",
                meta: [
                    "🥾 Sachen → Tshoka",
                    "🌲 Dense forest",
                    "▲ Approx. 3,000 m"
                ]
            },

            {
                day: "04",
                title: "Tshoka → Dzongri",
                description:
                    "A challenging but rewarding day awaits. Trek through beautiful rhododendron forests as the trail climbs steadily towards Dzongri. With every step, the surrounding Himalayan peaks come closer into view.",
                meta: [
                    "🥾 High-altitude trek",
                    "🌺 Rhododendron forests",
                    "▲ Approx. 4,020 m"
                ]
            },

            {
                day: "05",
                title: "Dzongri Top Sunrise",
                description:
                    "Wake up early and trek towards Dzongri Top at approximately 4,200 m to witness a spectacular Himalayan sunrise. On a clear morning, enjoy panoramic views of Mt. Kanchenjunga, Mt. Pandim and the surrounding peaks. Return to camp and spend the rest of the day resting and acclimatizing.",
                meta: [
                    "🌅 Sunrise trek",
                    "▲ 4,200 m",
                    "🏔️ 360° mountain views"
                ]
            },

            {
                day: "06",
                title: "Descent → Yuksom → NJP / Bagdogra",
                description:
                    "Complete the descent towards Yuksom and begin the drive back towards NJP / Bagdogra, bringing the Himalayan adventure to an end.",
                meta: [
                    "🥾 Descent",
                    "🚗 Drive to NJP",
                    "🏁 Trip ends"
                ]
            }

        ],

        included: [
            "Accommodation",
            "Meals during the trek",
            "Experienced trek leader",
            "Local transportation",
            "Basic first aid support"
        ],

        excluded: [
            "Train or flight tickets",
            "Personal expenses",
            "Travel insurance",
            "Personal trekking equipment",
            "Porter",
            "Permit fees (if any)",
            "Anything not mentioned above"
        ],

        gallery: [

            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85",

            "https://commons.wikimedia.org/wiki/Special:FilePath/Dzongri%20trek%20in%202010%20DSC04029.jpg",

            "https://commons.wikimedia.org/wiki/Special:FilePath/Mt.%20Narsing%20from%20Dzongri%20DSC04018.jpg",

            "https://commons.wikimedia.org/wiki/Special:FilePath/Somewhere%20In%20Dzongri%20Trek%20%28168283917%29.jpeg"

        ]

    },


    /* =====================================================
       TINCHULEY
    ===================================================== */

    tinchuley: {

        title: "Tinchuley Camping",

        category: "MOUNTAIN ESCAPE",

        location: "West Bengal",

        duration: "2 Days / 1 Night",

        price: "₹1,999",

        seats: "10 Seats",

        heroImage:
            "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=85",

        heroDescription:
            "Escape to a peaceful mountain village for a refreshing weekend of village walks, scenic sightseeing, homestay comfort and campfire evenings.",

        aboutTitle:
            "Discover Tinchuley",

        about: [
            "Escape to the peaceful mountain village of Tinchuley for a refreshing weekend surrounded by forests, quiet village trails and beautiful Himalayan landscapes.",

            "Experience the charm of a local homestay, explore the village, enjoy scenic sightseeing and end the day around a warm campfire."
        ],

        difficulty: "Easy",

        bestSeason: "Oct – May",

        maxAltitude: "Approx. 5,800 ft",

        itineraryTitle:
            "Your 2-Day Journey",

        itinerary: [

            {
                day: "01",
                title: "NJP → Tinchuley",
                description:
                    "Our journey begins with a scenic drive from NJP to Tinchuley, a peaceful mountain village surrounded by lush forests and beautiful Himalayan landscapes. After reaching Tinchuley, check in to a cozy local homestay and take some time to relax. In the afternoon, explore the village and its quiet mountain trails. As evening sets in, return to the homestay and enjoy a relaxed campfire night with good food, conversations and mountain vibes.",
                meta: [
                    "🚗 NJP → Tinchuley",
                    "🌲 Village exploration",
                    "🔥 Campfire night"
                ]
            },

            {
                day: "02",
                title: "Tinchuley Sightseeing → NJP",
                description:
                    "Wake up to a beautiful mountain morning and enjoy breakfast at the homestay. After breakfast, head out for local sightseeing, exploring scenic viewpoints and beautiful spots around Tinchuley. After exploring the surroundings, begin the journey back to NJP by car.",
                meta: [
                    "🍳 Breakfast",
                    "🌄 Local sightseeing",
                    "🚗 Return to NJP"
                ]
            }

        ],

        included: [
            "NJP to NJP transportation",
            "Homestay accommodation",
            "Meals",
            "Local sightseeing",
            "Guide / trip leader",
            "Campfire"
        ],

        excluded: [
            "Train or flight tickets",
            "Personal expenses",
            "Travel insurance",
            "Anything not mentioned above"
        ],

        gallery: [

            "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=85",

            "https://commons.wikimedia.org/wiki/Special:FilePath/Tinchuley%20in%20Darjeeling.jpg",

            "https://commons.wikimedia.org/wiki/Special:FilePath/Sunset%20at%20Tinchuley%2C%20West%20Bengal%2C%20India%20%282013%29.jpg",

            "https://commons.wikimedia.org/wiki/Special:FilePath/A%20country%20road%20in%20Tinchuley%2C%20West%20Bengal%2C%20India%20%282013%29.jpg"

        ]

    }

};


/* =========================================================
   DYNAMIC TRIP DETAILS — READ TRIP FROM URL
========================================================= */

const tripParams =
    new URLSearchParams(window.location.search);

const selectedTrip =
    tripParams.get("trip");


/* =========================================================
   LOAD SELECTED TRIP
========================================================= */

const currentTrip =
    tripData[selectedTrip] || tripData.sandakphu;


if (document.querySelector(".trip-details-page")) {

    loadTripDetails(currentTrip);
    document.querySelector(".trip-details-page").style.visibility = "visible";

}


/* =========================================================
   DYNAMIC TRIP DETAILS FUNCTION
========================================================= */

function loadTripDetails(trip) {


    /* =====================================================
       PAGE TITLE
    ===================================================== */

    const pageTitle =
        document.getElementById("pageTitle");

    if (pageTitle) {

        pageTitle.textContent =
            `${trip.title} | Beyond Trails`;

    }


    /* =====================================================
       HERO IMAGE
    ===================================================== */

    const tripHeroImage =
        document.getElementById("tripHeroImage");

    if (tripHeroImage) {

        tripHeroImage.src =
            trip.heroImage;

        tripHeroImage.alt =
            trip.title;

    }


    /* =====================================================
       HERO LABEL
    ===================================================== */

    const tripHeroLabel =
        document.getElementById("tripHeroLabel");

    if (tripHeroLabel) {

        tripHeroLabel.textContent =
            `${trip.category} • ${trip.location}`;

    }


    /* =====================================================
       HERO TITLE
    ===================================================== */

    const tripHeroTitle =
        document.getElementById("tripHeroTitle");

    if (tripHeroTitle) {

        tripHeroTitle.textContent =
            trip.title;

    }


    /* =====================================================
       HERO DESCRIPTION
    ===================================================== */

    const tripHeroDescription =
        document.getElementById("tripHeroDescription");

    if (tripHeroDescription) {

        tripHeroDescription.textContent =
            trip.heroDescription;

    }


    /* =====================================================
       QUICK INFO
    ===================================================== */

    const tripLocation =
        document.getElementById("tripLocation");

    const tripDuration =
        document.getElementById("tripDuration");

    const tripPrice =
        document.getElementById("tripPrice");

    const tripSeats =
        document.getElementById("tripSeats");


    if (tripLocation) {

        tripLocation.textContent =
            trip.location;

    }


    if (tripDuration) {

        tripDuration.textContent =
            trip.duration;

    }


    if (tripPrice) {

        tripPrice.textContent =
            trip.price;

    }


    if (tripSeats) {

        tripSeats.textContent =
            trip.seats;

    }


    /* =====================================================
       GALLERY
    ===================================================== */

    const galleryImages = [

        document.getElementById("galleryImage1"),

        document.getElementById("galleryImage2"),

        document.getElementById("galleryImage3"),

        document.getElementById("galleryImage4")

    ];


    galleryImages.forEach(function (image, index) {

        if (image && trip.gallery[index]) {

            image.src =
                trip.gallery[index];

            image.alt =
                `${trip.title} - Gallery Image ${index + 1}`;

        }

    });


    /* =====================================================
       ABOUT TITLE
    ===================================================== */

    const aboutTitle =
        document.getElementById("aboutTitle");

    if (aboutTitle) {

        aboutTitle.textContent =
            trip.aboutTitle;

    }


    /* =====================================================
       ABOUT DESCRIPTION
    ===================================================== */

    const aboutDescription =
        document.getElementById("aboutDescription");

    if (aboutDescription) {

        aboutDescription.innerHTML = "";

        trip.about.forEach(function (paragraph) {

            const p =
                document.createElement("p");

            p.textContent =
                paragraph;

            aboutDescription.appendChild(p);

        });

    }


    /* =====================================================
       ITINERARY TITLE
    ===================================================== */

    const itineraryTitle =
        document.getElementById("itineraryTitle");

    if (itineraryTitle) {

        itineraryTitle.textContent =
            trip.itineraryTitle;

    }


    /* =====================================================
       ITINERARY
    ===================================================== */

    const itineraryContainer =
        document.getElementById("itineraryContainer");


    if (itineraryContainer) {

        itineraryContainer.innerHTML = "";


        trip.itinerary.forEach(function (item) {


            /* =========================
               DAY ITEM
            ========================= */

            const dayItem =
                document.createElement("div");

            dayItem.className =
                "day-item";


            /* =========================
               DAY NUMBER
            ========================= */

            const dayNumber =
                document.createElement("div");

            dayNumber.className =
                "day-number";

            dayNumber.innerHTML =
                `DAY <strong>${item.day}</strong>`;


            /* =========================
               DAY CONTENT
            ========================= */

            const dayContent =
                document.createElement("div");

            dayContent.className =
                "day-content";


            /* =========================
               DAY TITLE
            ========================= */

            let titleHTML =
                item.title;

            if (item.subtitle) {

                titleHTML +=
                    ` <span>(${item.subtitle})</span>`;

            }


            const dayTitle =
                document.createElement("h3");

            dayTitle.innerHTML =
                titleHTML;


            /* =========================
               DAY DESCRIPTION
            ========================= */

            const dayDescription =
                document.createElement("p");

            dayDescription.textContent =
                item.description;


            /* =========================
               DAY META
            ========================= */

            const dayMeta =
                document.createElement("div");

            dayMeta.className =
                "day-meta";


            item.meta.forEach(function (metaItem) {

                const metaSpan =
                    document.createElement("span");

                metaSpan.textContent =
                    metaItem;

                dayMeta.appendChild(
                    metaSpan
                );

            });


            /* =========================
               APPEND CONTENT
            ========================= */

            dayContent.appendChild(
                dayTitle
            );

            dayContent.appendChild(
                dayDescription
            );

            dayContent.appendChild(
                dayMeta
            );


            dayItem.appendChild(
                dayNumber
            );

            dayItem.appendChild(
                dayContent
            );


            itineraryContainer.appendChild(
                dayItem
            );

        });

    }


    /* =====================================================
       INCLUDED
    ===================================================== */

    const includedList =
        document.getElementById("includedList");


    if (includedList) {

        includedList.innerHTML = "";


        trip.included.forEach(function (item) {

            const li =
                document.createElement("li");

            li.textContent =
                `✓ ${item}`;

            includedList.appendChild(li);

        });

    }


    /* =====================================================
       EXCLUDED
    ===================================================== */

    const excludedList =
        document.getElementById("excludedList");


    if (excludedList) {

        excludedList.innerHTML = "";


        trip.excluded.forEach(function (item) {

            const li =
                document.createElement("li");

            li.textContent =
                `✕ ${item}`;

            excludedList.appendChild(li);

        });

    }


    /* =====================================================
       BOOKING CTA
    ===================================================== */

    const bookingTitle =
        document.getElementById("bookingTitle");


    if (bookingTitle) {

        bookingTitle.innerHTML =
            `Start Your<br>${trip.title} Adventure`;

    }


    const bookingSmallText =
        document.getElementById("bookingSmallText");


    if (bookingSmallText) {

        bookingSmallText.textContent =
            `Your ${trip.title} adventure starts here.`;

    }


    /* =====================================================
       TRIP HIGHLIGHTS
    ===================================================== */

    const bestSeason =
        document.getElementById("bestSeason");

    const difficulty =
        document.getElementById("difficulty");

    const maxAltitude =
        document.getElementById("maxAltitude");


    if (bestSeason) {

        bestSeason.innerHTML =
            trip.bestSeason;

    }


    if (difficulty) {

        difficulty.innerHTML =
            trip.difficulty;

    }


    if (maxAltitude) {

        maxAltitude.innerHTML =
            trip.maxAltitude;

    }

}


/* =========================================================
   DYNAMIC STAY DATABASE
   BEYOND TRAILS
========================================================= */

const stayData = {


    /* =====================================================
       TUMLING
    ===================================================== */

    tumling: {

        title: "Tumling Forest Stay",

        category: "OUR OWN MOUNTAIN STAY",

        location: "Tumling, West Bengal",

        price: "₹1,500 / night",

        roomCount: "4 Rooms",

        type: "Mountain Stay",


        /* =================================================
           HERO IMAGE
        ================================================= */

        heroImage:
            "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1600&q=85",

        heroDescription:
            "A peaceful mountain stay surrounded by forests, fresh air and beautiful Himalayan views.",


        /* =================================================
           ABOUT
        ================================================= */

        aboutTitle:
            "A Place to Stay. A Place to Belong.",

        about: [

            "Sometimes the journey is not only about where you go, but also where you stay.",

            "Our own mountain homestay in Tumling gives you a chance to slow down, connect with nature and experience the warmth of local mountain life.",

            "Wake up to fresh mountain air, spend your day exploring the surrounding trails and return to a warm and peaceful place in the evening."

        ],


        /* =================================================
           ROOMS
        ================================================= */

        rooms: [

            {
                name: "Mountain View Room",

                description:
                    "A cozy room with beautiful views of the surrounding mountains and valleys.",

                detail:
                    "Perfect for couples or solo travellers."
            },

            {
                name: "Forest View Room",

                description:
                    "A peaceful room overlooking the surrounding forest and greenery.",

                detail:
                    "Ideal for guests looking for a quiet escape."
            },

            {
                name: "Family Room",

                description:
                    "A comfortable room designed for small families or groups.",

                detail:
                    "Suitable for up to 3 guests."
            },

            {
                name: "Cozy Double Room",

                description:
                    "A warm and comfortable room for two guests.",

                detail:
                    "Perfect for a relaxing mountain stay."
            }

        ],


        /* =================================================
           AMENITIES
        ================================================= */

        amenities: [

            "Comfortable beds",
            "Attached bathroom",
            "Mountain views",
            "Hot water",
            "Wi-Fi",
            "Homemade meals",
            "Common sitting area",
            "Campfire on request"

        ],


        /* =================================================
           EXPERIENCE
        ================================================= */

        experience: [

            "Mountain sunrise",
            "Forest walks",
            "Village exploration",
            "Local food",
            "Peaceful evenings",
            "Campfire nights"

        ],


        /* =================================================
           GALLERY
        ================================================= */

        gallery: [

            "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1600&q=85",

            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",

            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",

            "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=80"

        ]

    },


    /* =====================================================
   LEPCHAJAGAT
===================================================== */

lepchajagat: {

    title: "Lepchajagat Mountain Stay",

    category: "MOUNTAIN HOMESTAY",

    location: "Lepchajagat, West Bengal",

    price: "₹1,800 / night",

    roomCount: "4 Rooms",

    type: "Mountain Stay",


    /* =================================================
       LEPCHAJAGAT HERO IMAGE

       Same image used on the Stay Card
    ================================================= */

    heroImage:
        "image/lepchajagatstay.jpg",


    heroDescription:
        "Wake up among pine forests and enjoy a quiet escape away from the crowds.",


    /* =================================================
       ABOUT THE STAY
    ================================================= */

    aboutTitle:
        "Slow Down. Breathe Deep. Stay Close to Nature.",

    about: [

        "Lepchajagat is the kind of place where the journey naturally slows down.",

        "Surrounded by pine forests and mountain views, this cozy stay is perfect for travellers looking for peace, fresh air and a break from busy city life.",

        "Spend your mornings exploring the forest, enjoy a warm meal and end the day surrounded by the quiet beauty of the hills."

    ],


    /* =================================================
       LEPCHAJAGAT ROOMS
    ================================================= */

    rooms: [

        {
            name: "Pine View Room",

            description:
                "A cozy room surrounded by the peaceful pine forest.",

            detail:
                "Perfect for couples or solo travellers."
        },

        {
            name: "Mountain View Room",

            description:
                "A comfortable room with beautiful views of the surrounding hills.",

            detail:
                "Ideal for a relaxing mountain getaway."
        },

        {
            name: "Family Room",

            description:
                "A spacious room suitable for families and small groups.",

            detail:
                "Comfortable for up to 3 guests."
        },

        {
            name: "Cozy Double Room",

            description:
                "A simple and warm room designed for two guests.",

            detail:
                "Perfect for a peaceful weekend escape."
        }

    ],


    /* =================================================
       LEPCHAJAGAT AMENITIES
    ================================================= */

    amenities: [

        "Comfortable beds",

        "Attached bathroom",

        "Hot water",

        "Wi-Fi",

        "Mountain views",

        "Homemade meals",

        "Common sitting area",

        "Outdoor seating"

    ],


    /* =================================================
       LEPCHAJAGAT EXPERIENCE
    ================================================= */

    experience: [

        "Pine forest walks",

        "Mountain sunrise",

        "Bird watching",

        "Local food",

        "Village exploration",

        "Quiet evenings"

    ],


    /* =================================================
       LEPCHAJAGAT GALLERY

       Gallery 1 = Same as Hero / Stay Card

       Gallery 2, 3, 4 = Your downloaded
       Lepchajagat images
    ================================================= */

    gallery: [

        /* Gallery 1 — Same as Hero + Stay Card */
        "image/lepchajagatstay.jpg",

        /* Gallery 2 */
        "image/lepchajagatone.jpg",

        /* Gallery 3 */
        "image/lepchajagattwo.jpg",

        /* Gallery 4 */
        "image/lepchajagatthree.jpg"

    ]

},

    /* =====================================================
       TINCHULEY
    ===================================================== */

    tinchuley: {

        title: "Tinchuley Homestay",

        category: "VILLAGE HOMESTAY",

        location: "Tinchuley, West Bengal",

        price: "₹2,000 / night",

        roomCount: "5 Rooms",

        type: "Village Homestay",


        /* =================================================
           HERO IMAGE
        ================================================= */

        heroImage:
            "https://static.wixstatic.com/media/9d4c7a_4fcdc10d51d34c3fa111be0d2f834765~mv2.webp/v1/fill/w_1114%2Ch_593%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/9d4c7a_4fcdc10d51d34c3fa111be0d2f834765~mv2.webp",

        heroDescription:
            "Experience village life, mountain views and the warmth of a peaceful local stay.",


        /* =================================================
           ABOUT
        ================================================= */

        aboutTitle:
            "Live Slow. Live Local.",

        about: [

            "Tinchuley offers a beautiful mix of mountain landscapes, village life and peaceful surroundings.",

            "Our stay gives you a chance to experience the warmth of a traditional homestay while enjoying comfortable rooms and beautiful views.",

            "It is a perfect base for exploring the surrounding villages, forests and viewpoints."

        ],


        /* =================================================
           ROOMS
        ================================================= */

        rooms: [

            {
                name: "Mountain View Room",

                description:
                    "A bright and comfortable room overlooking the surrounding hills.",

                detail:
                    "Ideal for couples and solo travellers."
            },

            {
                name: "Garden View Room",

                description:
                    "A peaceful room overlooking the greenery around the property.",

                detail:
                    "Perfect for nature lovers."
            },

            {
                name: "Family Room",

                description:
                    "A spacious room designed for families or small groups.",

                detail:
                    "Suitable for up to 3 guests."
            },

            {
                name: "Deluxe Double Room",

                description:
                    "A comfortable room with extra space for a relaxed stay.",

                detail:
                    "Perfect for couples."
            },

            {
                name: "Cozy Twin Room",

                description:
                    "A simple room with two comfortable beds.",

                detail:
                    "Great for friends travelling together."
            }

        ],


        /* =================================================
           AMENITIES
        ================================================= */

        amenities: [

            "Comfortable beds",
            "Attached bathroom",
            "Hot water",
            "Homemade meals",
            "Mountain views",
            "Garden area",
            "Common dining area",
            "Wi-Fi"

        ],


        /* =================================================
           EXPERIENCE
        ================================================= */

        experience: [

            "Village walks",
            "Mountain views",
            "Local food",
            "Tea garden visits",
            "Nature walks",
            "Peaceful evenings"

        ],


        /* =================================================
           GALLERY
        ================================================= */

        gallery: [

            "https://static.wixstatic.com/media/9d4c7a_4fcdc10d51d34c3fa111be0d2f834765~mv2.webp/v1/fill/w_1114%2Ch_593%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/9d4c7a_4fcdc10d51d34c3fa111be0d2f834765~mv2.webp",

            "https://images.fusionstays.com/files/?url=https%3A%2F%2Fres.cloudinary.com%2Ffusionstays%2Fimage%2Fupload%2Fc_fill%2Ce_sharpen%3A100%2Cq_auto%2Cf_auto%2Cfl_progressive%2Cw_750%2Ch_500%2Fv1707823884%2Fproperty%2F560%2Fcq6qj52fsgrymprqghzn.jpg",

            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",

            "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=80"

        ]

    },


    /* =====================================================
       YELBONG
    ===================================================== */

    yelbong: {

        title: "Yelbong Riverside Stay",

        category: "RIVERSIDE STAY",

        location: "Yelbong, North Bengal",

        price: "₹1,600 / night",

        roomCount: "3 Rooms",

        type: "Riverside Stay",


        /* =================================================
           HERO IMAGE
        ================================================= */

        heroImage:
            "https://images.fusionstays.com/files/?url=https%3A%2F%2Fres.cloudinary.com%2Ffusionstays%2Fimage%2Fupload%2Fc_fill%2Ce_sharpen%3A100%2Cq_auto%2Cf_auto%2Cfl_progressive%2Cw_750%2Ch_500%2Fv1745950967%2Fproperty%2F1573%2Fgoavkk7psi6tbi60r69c.jpg",

        heroDescription:
            "Stay close to the river, explore the canyon and experience the raw beauty of North Bengal.",


        /* =================================================
           ABOUT
        ================================================= */

        aboutTitle:
            "Stay Close to the River. Wake Up to Adventure.",

        about: [

            "Yelbong is where nature and adventure come together.",

            "This riverside stay gives you easy access to the river, surrounding forests and the famous Yelbong canyon trail.",

            "After a day of exploring, return to a simple and peaceful stay where you can relax beside nature."

        ],


        /* =================================================
           ROOMS
        ================================================= */

        rooms: [

            {
                name: "Riverside Double Room",

                description:
                    "A cozy room for two guests located close to the river.",

                detail:
                    "Perfect for couples."
            },

            {
                name: "Forest View Room",

                description:
                    "A peaceful room surrounded by greenery and natural ambience.",

                detail:
                    "Ideal for solo travellers or friends."
            },

            {
                name: "Family Room",

                description:
                    "A comfortable room suitable for small families or groups.",

                detail:
                    "Suitable for up to 3 guests."
            }

        ],


        /* =================================================
           AMENITIES
        ================================================= */

        amenities: [

            "Comfortable beds",
            "Attached bathroom",
            "Hot water",
            "Homemade meals",
            "Riverside seating",
            "Common dining area",
            "Parking",
            "Local guide assistance"

        ],


        /* =================================================
           EXPERIENCE
        ================================================= */

        experience: [

            "River walks",
            "Yelbong canyon",
            "Forest exploration",
            "Local village life",
            "Nature photography",
            "Campfire evenings"

        ],


/* =====================================================
   YELBONG GALLERY
===================================================== */

gallery: [

    /* 1st Gallery Image — Same as Hero Image */
    "https://images.fusionstays.com/files/?url=https%3A%2F%2Fres.cloudinary.com%2Ffusionstays%2Fimage%2Fupload%2Fc_fill%2Ce_sharpen%3A100%2Cq_auto%2Cf_auto%2Cfl_progressive%2Cw_750%2Ch_500%2Fv1745950967%2Fproperty%2F1573%2Fgoavkk7psi6tbi60r69c.jpg",

    /* 2nd Gallery Image — Yelbong Room / Interior */
    "image/yel.jpg",

    /* 3rd Gallery Image — Yelbong Dining Area */
    "image/yelbongdaining.jpg",

    /* 4th Gallery Image — Yelbong Homestay View */
    "image/yelbonghomestayview.jpg"

       ],

    }

};


/* =========================================================
   DYNAMIC STAY DETAILS — LOAD DATA FROM URL
========================================================= */

const stayDetailsPage =
    document.querySelector(".stay-details-page");


if (stayDetailsPage) {


    /* =====================================================
       GET STAY FROM URL
    ===================================================== */

    const stayParams =
        new URLSearchParams(window.location.search);

    const selectedStay =
        stayParams.get("stay");

    const currentStay =
        stayData[selectedStay];


    /* =====================================================
       CHECK STAY DATA
    ===================================================== */

    if (currentStay) {


        /* =================================================
           PAGE TITLE
        ================================================= */

        document.title =
            currentStay.title + " | Beyond Trails";


        /* =================================================
           HERO SECTION
        ================================================= */

        document.getElementById("stayHeroImage").src =
            currentStay.heroImage;

        document.getElementById("stayHeroImage").alt =
            currentStay.title;

        document.getElementById("stayCategory").textContent =
            currentStay.category;

        document.getElementById("stayTitle").textContent =
            currentStay.title;

        document.getElementById("stayHeroDescription").textContent =
            currentStay.heroDescription;


        /* =================================================
           QUICK INFORMATION
        ================================================= */

        document.getElementById("stayLocation").textContent =
            currentStay.location;

        document.getElementById("stayPrice").textContent =
            currentStay.price;

        document.getElementById("stayRooms").textContent =
            currentStay.roomCount;

        document.getElementById("stayType").textContent =
            currentStay.type;


        /* =================================================
           ABOUT THE STAY
        ================================================= */

        document.getElementById("aboutStayTitle").textContent =
            currentStay.aboutTitle;


        const stayDescription =
            document.getElementById("stayDescription");

        stayDescription.innerHTML = "";


        currentStay.about.forEach(function (paragraph) {

            const p =
                document.createElement("p");

            p.textContent =
                paragraph;

            stayDescription.appendChild(p);

        });


        /* =================================================
           ROOMS
        ================================================= */

        const roomsContainer =
            document.getElementById("roomsContainer");

        roomsContainer.innerHTML = "";


        currentStay.rooms.forEach(function (room) {

            const roomCard =
                document.createElement("div");

            roomCard.className =
                "room-card";


            roomCard.innerHTML = `

                <h3>
                    ${room.name}
                </h3>

                <p>
                    ${room.description}
                </p>

                <small>
                    ${room.detail}
                </small>

            `;


            roomsContainer.appendChild(roomCard);

        });


        /* =================================================
           GALLERY
        ================================================= */

        currentStay.gallery.forEach(function (image, index) {

            const galleryImage =
                document.getElementById(
                    "stayGalleryImage" + (index + 1)
                );


            if (galleryImage) {

                galleryImage.src =
                    image;

                galleryImage.alt =
                    currentStay.title +
                    " Gallery Image " +
                    (index + 1);

            }

        });


        /* =================================================
           AMENITIES
        ================================================= */

        const amenitiesList =
            document.getElementById("amenitiesList");

        amenitiesList.innerHTML = "";


        currentStay.amenities.forEach(function (amenity) {

            const li =
                document.createElement("li");

            li.textContent =
                "✓ " + amenity;

            amenitiesList.appendChild(li);

        });


        /* =================================================
           EXPERIENCE
        ================================================= */

        const experienceList =
            document.getElementById("experienceList");

        experienceList.innerHTML = "";


        currentStay.experience.forEach(function (experience) {

            const li =
                document.createElement("li");

            li.textContent =
                "✓ " + experience;

            experienceList.appendChild(li);

        });


        /* =================================================
           BOOKING CARD
        ================================================= */

        document.getElementById("stayBookingTitle").textContent =
            "Make Yourself at Home";

        document.getElementById("stayBookingText").textContent =
            "Your stay at " +
            currentStay.title +
            " starts here.";

    }

}

/* =========================================================
   STORY DETAILS — DYNAMIC STORY DATABASE
========================================================= */

const storyHeroImage =
    document.getElementById("storyHeroImage");

const storyTitle =
    document.getElementById("storyTitle");

const storyCategory =
    document.getElementById("storyCategory");

const storyLocation =
    document.getElementById("storyLocation");

const storyIntroTitle =
    document.getElementById("storyIntroTitle");

const storyIntroduction =
    document.getElementById("storyIntroduction");

const storyContent =
    document.getElementById("storyContent");

const storyHighlights =
    document.getElementById("storyHighlights");

const storyGallery =
    document.getElementById("storyGallery");

const storyClosingTitle =
    document.getElementById("storyClosingTitle");

const storyClosingText =
    document.getElementById("storyClosingText");

const storyPageTitle =
    document.getElementById("storyPageTitle");


/* =========================================================
   STORY DATABASE
========================================================= */

const stories = {

    /* =====================================================
       STORY 01 — YELBONG
    ===================================================== */

    yelbong: {

        title: "Into the Wild — Yelbong",

        category: "TREK STORY",

        location: "📍 Yelbong, North Bengal",

        heroImage: "image/yelbong.jpg",

        introTitle:
            "Sometimes the best journeys begin where the road ends.",

        introduction:
            "Yelbong was not just another destination on our list. It was a journey into a quieter side of North Bengal — through forests, rivers, rocks and places that still feel wonderfully untouched.",

        content: [

            "The journey to Yelbong started with curiosity. We wanted to experience something different — not a crowded tourist destination, but a place where nature itself becomes part of the adventure.",

            "As the familiar roads slowly disappeared behind us, the landscape began to change. The sound of traffic was replaced by the sound of flowing water, birds and the wind moving through the forest.",

            "The real adventure began when we entered the trail. Walking through the forest, crossing rocky sections and following the river made every step feel like part of a story.",

            "There were moments when we simply stopped walking and looked around. The canyon, the greenery and the flowing river created a landscape that felt completely different from the usual mountain escapes.",

            "Yelbong reminded us that adventure does not always need a famous summit. Sometimes, all you need is a trail, a little curiosity and the courage to explore somewhere new.",

            "By the end of the journey, we were tired, muddy and completely satisfied. And perhaps that is what made Yelbong special — it felt less like a trip and more like a real adventure."
        ],

        highlights: [

            {
                icon: "🌿",
                title: "Forest Trails",
                text: "Walk through peaceful forest paths surrounded by greenery."
            },

            {
                icon: "💧",
                title: "River & Canyon",
                text: "Follow the river and discover the dramatic landscape of Yelbong."
            },

            {
                icon: "🥾",
                title: "Real Adventure",
                text: "Rocky trails, river crossings and an experience beyond the usual tourist route."
            }

        ],

        gallery: [

            "image/yelbong.jpg",

            "image/yel.jpg",

            "image/yelbongdaining.jpg",

            "image/yelbonghomestayview.jpg"

        ],

        closingTitle:
            "Some trails are meant to be remembered.",

        closingText:
            "Yelbong was one of those journeys that stayed with us long after we returned home."

    },


    /* =====================================================
       STORY 02 — SANDAKPHU
    ===================================================== */

    sandakphu: {

        title: "Above the Clouds — Sandakphu",

        category: "MOUNTAIN STORY",

        location: "📍 Sandakphu, West Bengal",

        heroImage: "image/sandakphu.jpg",

        introTitle:
            "A long trail. A changing landscape. A view worth every step.",

        introduction:
            "Sandakphu is not the kind of journey that gives everything away easily. The trail tests your legs, changes its mood with every climb and finally rewards you with a view that makes the struggle feel completely worth it.",

        content: [

            "The Sandakphu journey began with one simple thought — how far can we actually walk for a view?",

            "The trail slowly took us away from the familiar. Villages became smaller, the roads became quieter and the mountains began to dominate the horizon.",

            "Some sections felt easy. Others demanded patience. With every climb, the body became tired, but the excitement of knowing what waited ahead kept us moving.",

            "The landscape constantly changed. Forests, mountain paths, small settlements and open ridges made the trail feel different at every turn.",

            "And then came the moments that made everything worth it. Standing high above the clouds, surrounded by enormous Himalayan peaks, gave us a feeling that photographs could never completely capture.",

            "Sandakphu taught us something simple — sometimes the best views are not the ones you drive to. They are the ones you earn, one step at a time."
        ],

        highlights: [

            {
                icon: "🏔️",
                title: "Mountain Trail",
                text: "A challenging Himalayan trail filled with changing landscapes."
            },

            {
                icon: "☁️",
                title: "Above The Clouds",
                text: "Experience incredible mountain views from one of Bengal's highest points."
            },

            {
                icon: "🥾",
                title: "One Step At A Time",
                text: "A journey where patience, endurance and determination become part of the adventure."
            }

        ],

        gallery: [

            "image/sandakphu.jpg",

            "image/sandakphu1.jpg",

            "image/sandakphu2.jpg",

            "image/sandakphu3.jpg"

        ],

        closingTitle:
            "The mountains are always worth the climb.",

        closingText:
            "Sandakphu was not only about reaching a destination. It was about everything we discovered along the way."

    },


    /* =====================================================
       STORY 03 — NIGHT CAMPING
    ===================================================== */

    nightcamping: {

        title: "Under the Stars — Night Camping",

        category: "CAMPING STORY",

        location: "📍 North Bengal",

        heroImage: "image/nigntcamping.jpg",

        introTitle:
            "Sometimes you only need one night away from the city.",

        introduction:
            "No traffic. No deadlines. No endless notifications. Just a tent, a warm fire, quiet surroundings and a sky full of stars.",

        content: [

            "We often think that travelling means going far away. But sometimes, the perfect escape is simply one night spent somewhere quiet.",

            "As evening arrived, the surroundings slowly became darker. The familiar sounds of the day disappeared and the campsite began to feel like its own little world.",

            "The fire became the centre of the evening. We talked, laughed, shared stories and simply enjoyed being away from the noise of everyday life.",

            "Later that night, we looked up and realised how different the sky looks when there are no city lights around. The stars seemed brighter, the silence deeper and the whole experience strangely peaceful.",

            "There was no complicated plan for the night. And perhaps that was the best part. We were simply there — together, outdoors and completely present in the moment.",

            "The next morning came quietly. And although it was only one night, it felt like we had been away much longer."
        ],

        highlights: [

            {
                icon: "⛺",
                title: "Camp Life",
                text: "A simple outdoor experience surrounded by nature."
            },

            {
                icon: "🔥",
                title: "Campfire Evenings",
                text: "Stories, conversations and warm moments around the fire."
            },

            {
                icon: "✨",
                title: "Starry Nights",
                text: "Leave the city lights behind and enjoy a peaceful night under the stars."
            }

        ],

        gallery: [

            "image/nigntcamping.jpg",

            "image/nightcamping1.jpg",

            "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80",

            "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1200&q=80"

        ],

        closingTitle:
            "Sometimes, one quiet night is enough.",

        closingText:
            "Night camping reminded us that slowing down can be an adventure too."

    }

};


/* =========================================================
   GET STORY FROM URL
========================================================= */

if (
    storyHeroImage &&
    storyTitle &&
    storyCategory &&
    storyLocation
) {

    const urlParams =
        new URLSearchParams(window.location.search);

    const storyKey =
        urlParams.get("story");

    const story =
        stories[storyKey] || stories.yelbong;


    /* =====================================================
       BASIC STORY INFORMATION
    ===================================================== */

    storyHeroImage.src =
        story.heroImage;

    storyHeroImage.alt =
        story.title;

    storyTitle.textContent =
        story.title;

    storyCategory.textContent =
        story.category;

    storyLocation.textContent =
        story.location;

    storyPageTitle.textContent =
        story.title + " | Beyond Trails";


    /* =====================================================
       STORY INTRODUCTION
    ===================================================== */

    storyIntroTitle.textContent =
        story.introTitle;

    storyIntroduction.innerHTML =
        `<p>${story.introduction}</p>`;


    /* =====================================================
       FULL STORY CONTENT
    ===================================================== */

    storyContent.innerHTML = "";

    story.content.forEach(function (paragraph) {

        const paragraphElement =
            document.createElement("p");

        paragraphElement.textContent =
            paragraph;

        storyContent.appendChild(
            paragraphElement
        );

    });


    /* =====================================================
       STORY HIGHLIGHTS
    ===================================================== */

    storyHighlights.innerHTML = "";

    story.highlights.forEach(function (highlight) {

        const card =
            document.createElement("div");

        card.className =
            "story-highlight-card";

        card.innerHTML = `

            <span>
                ${highlight.icon}
            </span>

            <h3>
                ${highlight.title}
            </h3>

            <p>
                ${highlight.text}
            </p>

        `;

        storyHighlights.appendChild(card);

    });


    /* =====================================================
       STORY GALLERY
    ===================================================== */

    storyGallery.innerHTML = "";

    story.gallery.forEach(function (image, index) {

        const imageContainer =
            document.createElement("div");

        imageContainer.className =
            "story-gallery-image";

        imageContainer.innerHTML = `

            <img
                src="${image}"
                alt="${story.title} — Image ${index + 1}"
            >

        `;

        storyGallery.appendChild(
            imageContainer
        );

    });


    /* =====================================================
       STORY CLOSING
    ===================================================== */

    storyClosingTitle.textContent =
        story.closingTitle;

    storyClosingText.textContent =
        story.closingText;

}
/* =========================================================
   BOOKING TYPE — TRIPS & STAYS
========================================================= */

const bookingType =
    document.getElementById("bookingType");

const bookingItem =
    document.getElementById("bookingItem");


if (bookingType && bookingItem) {

    const tripOptions = [

        "Sandakphu Trek",
        "Yelbong Trek",
        "Hilley – Varsey",
        "Lepchajagat",
        "Night Camping"

    ];


    const stayOptions = [

        "Tumling Forest Stay",
        "Lepchajagat Mountain Stay",
        "Tinchuley Homestay",
        "Yelbong Riverside Stay"

    ];


    bookingType.addEventListener(
        "change",
        function () {

            bookingItem.innerHTML =
                '<option value="">Select an option</option>';


            let options = [];


            if (bookingType.value === "trip") {

                options = tripOptions;

            }


            if (bookingType.value === "stay") {

                options = stayOptions;

            }


            options.forEach(function (item) {

                const option =
                    document.createElement("option");

                option.value = item;

                option.textContent = item;

                bookingItem.appendChild(option);

            });

        }
    );

}
/* =========================================================
   CONDITIONAL BOOKING FIELDS
========================================================= */

const tripBookingFields =
    document.getElementById("tripBookingFields");

const stayBookingFields =
    document.getElementById("stayBookingFields");


if (
    bookingType &&
    tripBookingFields &&
    stayBookingFields
) {

    bookingType.addEventListener(
        "change",
        function () {

            /* =========================
               RESET BOTH FIELDS
            ========================= */

            tripBookingFields.style.display = "none";

            stayBookingFields.style.display = "none";


            /* =========================
               TRIP BOOKING
            ========================= */

            if (bookingType.value === "trip") {

                tripBookingFields.style.display = "block";

            }


            /* =========================
               STAY BOOKING
            ========================= */

            if (bookingType.value === "stay") {

                stayBookingFields.style.display = "block";

            }

        }
    );

}
/* =========================================================
   BOOKING PRICE CALCULATOR
========================================================= */

const bookingPriceBox =
    document.getElementById("bookingPriceBox");

const bookingPrice =
    document.getElementById("bookingPrice");

const bookingPriceNote =
    document.getElementById("bookingPriceNote");

const tripPeople =
    document.getElementById("tripPeople");

const stayRooms =
    document.getElementById("stayRooms");

const stayNights =
    document.getElementById("stayNights");


/* =========================================================
   TRIP & STAY PRICES
========================================================= */

const bookingPrices = {

    /* =========================
       TRIPS
    ========================= */

    "Sandakphu Trek": 9999,

    "Yelbong Trek": 4499,

    "Hilley – Varsey": 5499,

    "Lepchajagat": 2499,

    "Night Camping": 1799,


    /* =========================
       STAYS — PER NIGHT
    ========================= */

    "Tumling Forest Stay": 1500,

    "Lepchajagat Mountain Stay": 1800,

    "Tinchuley Homestay": 2000,

    "Yelbong Riverside Stay": 1600

};


/* =========================================================
   UPDATE ESTIMATED PRICE
========================================================= */

function updateBookingPrice() {

    if (
        !bookingType ||
        !bookingItem ||
        !bookingPriceBox ||
        !bookingPrice
    ) {
        return;
    }


    const selectedItem =
        bookingItem.value;


    const price =
        bookingPrices[selectedItem];


    /* =========================
       NO SELECTION
    ========================= */

    if (!selectedItem || !price) {

        bookingPriceBox.style.display = "none";

        return;

    }


    let total = 0;

    let note = "";


    /* =========================
       TRIP PRICE
       PRICE × PEOPLE
    ========================= */

    if (bookingType.value === "trip") {

        const people =
            Number(tripPeople.value) || 1;

        total =
            price * people;

        note =
            `₹${price.toLocaleString("en-IN")} per person × ${people} ${people === 1 ? "person" : "people"}`;

    }


    /* =========================
       STAY PRICE
       PRICE × ROOMS × NIGHTS
    ========================= */

    if (bookingType.value === "stay") {

        const rooms =
            Number(stayRooms.value) || 1;

        const nights =
            Number(stayNights.value) || 1;

        total =
            price * rooms * nights;

        note =
            `₹${price.toLocaleString("en-IN")} / night × ${rooms} ${rooms === 1 ? "room" : "rooms"} × ${nights} ${nights === 1 ? "night" : "nights"}`;

    }


    /* =========================
       SHOW PRICE
    ========================= */

    bookingPrice.textContent =
        `₹${total.toLocaleString("en-IN")}`;

    bookingPriceNote.textContent =
        note;

    bookingPriceBox.style.display =
        "block";

}


/* =========================================================
   PRICE UPDATE — SELECTION
========================================================= */

if (bookingItem) {

    bookingItem.addEventListener(
        "change",
        updateBookingPrice
    );

}


/* =========================================================
   PRICE UPDATE — TRIP PEOPLE
========================================================= */

if (tripPeople) {

    tripPeople.addEventListener(
        "input",
        updateBookingPrice
    );

}


/* =========================================================
   PRICE UPDATE — STAY ROOMS
========================================================= */

if (stayRooms) {

    stayRooms.addEventListener(
        "input",
        updateBookingPrice
    );

}


/* =========================================================
   PRICE UPDATE — STAY NIGHTS
========================================================= */

if (stayNights) {

    stayNights.addEventListener(
        "input",
        updateBookingPrice
    );

}
/* =========================================================
   DYNAMIC TRIP SEAT AVAILABILITY
========================================================= */

async function updateTripSeatAvailability() {

    try {

        const response =
            await fetch("/api/trips/availability");


        const result =
            await response.json();


        if (!result.success) {

            console.error(
                "Unable to load trip availability."
            );

            return;

        }


        /* =========================
           FIND TRIP CARDS
        ========================= */

        const tripCards =
            document.querySelectorAll(".trip-card");


        tripCards.forEach(card => {

            const titleElement =
                card.querySelector(".trip-info h3");


            const seatElement =
                card.querySelector(".seats");


            const bookButton =
                card.querySelector(".card-book-btn");


            if (
                !titleElement ||
                !seatElement
            ) {

                return;

            }


            const cardTripName =
    titleElement.textContent.trim();


           const tripNameMap = {
              "Yelbong": "Yelbong Trek"
        };
            const tripName =
              tripNameMap[cardTripName] ||
              cardTripName;

            /* =========================
               FIND TRIP AVAILABILITY
            ========================= */

            const trip =
                result.trips.find(
                    item =>
                        item.tripName === tripName
                );


            if (!trip) {

                return;

            }


            /* =========================
               UPDATE SEATS
            ========================= */

            if (trip.isFull) {

                seatElement.textContent =
                    "BOOK FULL";

                seatElement.classList.remove(
                    "available"
                );

                seatElement.classList.add(
                    "full"
                );


                /* =========================
                   DISABLE BOOK BUTTON
                ========================= */

                if (bookButton) {

                    bookButton.textContent =
                        "BOOK FULL";

                    bookButton.classList.add(
                        "book-full"
                    );

                    bookButton.setAttribute(
                        "aria-disabled",
                        "true"
                    );


                    bookButton.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            alert(
                                "Sorry, this trip is fully booked."
                            );

                        }
                    );

                }

            } else {

                seatElement.textContent =
                    `${trip.availableSeats} seats available`;

                seatElement.classList.remove(
                    "full"
                );

                seatElement.classList.add(
                    "available"
                );

            }

        });


    } catch (error) {

        console.error(
            "Trip Availability Error:",
            error
        );

    }

}

/* =========================
   LOAD TRIP AVAILABILITY
========================= */

updateTripSeatAvailability();