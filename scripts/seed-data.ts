import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding new data...')

    // 1. Clear existing data to avoid duplicates (optional but usually safer for this task)
    await prisma.testimonial.deleteMany({})
    await prisma.dealsPopup.deleteMany({})

    // 2. Seed Testimonials
    const testimonials = [
        {
            name: "Grace Wangeci",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "Very good service and highly recommended",
            image: "",
            trip: "",
            source: "Facebook",
            order: 1
        },
        {
            name: "Wycliffe Okoth",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "Well planned and timely trip to Diani. Arranged for transfers and were always available for any clarification or assistance. Had a great experience with Denmar Tours and Travel",
            image: "",
            trip: "Diani Beach",
            source: "Facebook",
            order: 2
        },
        {
            name: "Kasweety Kayte",
            role: "",
            location: "Embu, Kenya",
            rating: 5,
            content: "World class experience…. especially the UAE tour and holiday",
            image: "",
            trip: "UAE Tour",
            source: "Facebook",
            order: 3
        },
        {
            name: "Faith Wanjira",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "Denmar Tours & Travel is the best and most reliable tour partner. After spending hours and hours on the internet looking up for holiday ideas I found them. The experience I had with Alex was best in class from the beginning to the end. Everything was thoroughly laid out,all my queries answered in details and the followed up was great. There were no surprises and the whole trip went as planned. I would definitely recommend Denmar Tours & Travel for all your vacation planning needs.",
            image: "",
            trip: "",
            source: "Facebook",
            order: 4
        },
        {
            name: "Tony Kamau",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "TI highly recommend Denmar. They are hands on and will keep you posted on everything. They organized my honeymoon and later and trip to diani. They are truly wonderful to work with. Thanks Alex and Dennis.",
            image: "",
            trip: "",
            source: "Facebook",
            order: 5
        },
        {
            name: "Aine Faith Twebanze",
            role: "",
            location: "Algiers, Algeria",
            rating: 5,
            content: "I recommend EVERYTHING about Denmar Tours & Travel. Their Professionalism and Care is off the chart.. Thank you so much Denmar, you made our honeymoon the best we could possibly have. The resort you recommended was top notch and beautiful. Denmar Tours & Travel took care of us and of all our needs. The staff are all so professional and caring. I can't even say enough of a Thank you. God bless you guys. ❤️❤️❤️❤️",
            image: "",
            trip: "",
            source: "Facebook",
            order: 6
        },
        {
            name: "Atie Nyodero",
            role: "",
            location: "Siaya, Kenya",
            rating: 5,
            content: "Thanks a lot for your hospitality Denmar Tours for making our vacation in Kenya with my family worthwhile,will always come back with more friends.The best tours and travel agency I have used.",
            image: "",
            trip: "",
            source: "Facebook",
            order: 7
        },
        {
            name: "Omian Ramo",
            role: "",
            location: "Siaya, Kenya",
            rating: 5,
            content: "Fast, efficiency and reliable agent .The packages are amazing and has been done accordingly as per the voucher.I have enjoyed my stay in Dubai hopefully visiting soon again.Your kind services are not taken for granted .will soon visit again with my fam and obviously through denmar.",
            image: "",
            trip: "Dubai, UAE",
            source: "Facebook",
            order: 8
        },
        {
            name: "Shikoh Kimani Mbugua",
            role: "",
            location: "Mombasa, Kenya",
            rating: 5,
            content: "My family has vacationed hassle free courtesy of Denmar Tours & Travel...their efficiency and customer service is top notch ..i highly recommend Denmar tours for all your travel needs.Thank you Denmar tours & Travel!",
            image: "",
            trip: "",
            source: "Facebook",
            order: 9
        },
        {
            name: "Peris Sonia",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "Making our little ones happy by organising great holidays and adventures, Anytime #Denmar Tours & Travel.",
            image: "",
            trip: "",
            source: "Facebook",
            order: 10
        },
        {
            name: "Lydiah Gatambu",
            role: "",
            location: "Mombasa, Kenya",
            rating: 5,
            content: "Would totally recommend Denmar Tours & Travel. Their efficiency, reliability and and great customer service keeps me going back. Thanks for always going an extra mile to ensure my trips are enjoyable and successful. Keep up the good job 👍👍",
            image: "",
            trip: "",
            source: "Facebook",
            order: 11
        },
        {
            name: "Stevo Ngure",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "Who knew Travels/Vacations and adventure would be so easy with Denmar tours and Travel. I have done several vacation with Denmar and they are the best .Denmar is your go to travel agency.",
            image: "",
            trip: "",
            source: "Facebook",
            order: 12
        },
        {
            name: "Kabura Essie",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "I have used Denmar Tours and Travel on a number of occasions and haven't been disappointed. a few instances is I used them when I first visited Dubai and everything was well planned out, our itinerary was perfect and we had a great time with my mum. they also book flights to different destinations and most recently booked my flights to the US. Their team is just awesome and are available all the time.  Denmar is your go to travel agency and I have never been disappointed!",
            image: "",
            trip: "USA",
            source: "Facebook",
            order: 13
        },
        {
            name: "Harriet Ngei",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "Greatful for choosing Denmar Tours & Travel for vacation needs. I sure will use them again.",
            image: "",
            trip: "",
            source: "Facebook",
            order: 14
        },
        {
            name: "Loyc Giturwa",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "Who knew travels/ vacations would be this easy. Just name the destination and Denmar will come to the rescue! I have done several vacations with Denmar (Dubai , Coast, Masai Mara) and I leave each trip already thinking of the next one! I would definitely recommend their services.",
            image: "",
            trip: "Dubai, Coast, Masai Mara",
            source: "Facebook",
            order: 15
        },
        {
            name: "Kiriga Kimani",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "Denmar Tours &Travels facilitated our visit to Meru national park. Their services are top notch and we would highly recommend them. Kudos Denmar.",
            image: "",
            trip: "Meru National Park",
            source: "Facebook",
            order: 16
        },
        {
            name: "Marion Nganga",
            role: "",
            location: "Nairobi, Kenya",
            rating: 5,
            content: "Denmar Tours & Travel are synonymous to efficiency, reliability and fun. They made my whole travelling experience to Dubai very easy and valuable back in 2019. My experience at Wild Wadi Water Park was one of my favourite parts of the tour.  I'll definitely revisit! I really had fun and would highly recommend them to any one. Get in touch with Denmar today and have all your travel needs met, just like mine!",
            image: "",
            trip: "Dubai",
            source: "Facebook",
            order: 17
        },
    ]

    for (const t of testimonials) {
        await prisma.testimonial.create({ data: t })
    }

    // 3. Seed Deals Popups
    const popups = [
        {
            title: "Turkish Airlines",
            subtitle: "Enjoy Massive Discounts & Flexible Ticket Fee. Upto 40% OFF",
            image: "/deals/turkishairlines.jpeg",
            link: "/deals/turkish-airlines",
            priority: 10
        },
        {
            title: "Singapore Special",
            subtitle: "Discover the best hotels and experiences in Singapore",
            image: "/deals/singapore.jpg",
            link: "/deals/best-hotels-singapore",
            priority: 5
        }
    ]

    for (const p of popups) {
        await prisma.dealsPopup.create({ data: p })
    }

    console.log('Seeding completed successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
