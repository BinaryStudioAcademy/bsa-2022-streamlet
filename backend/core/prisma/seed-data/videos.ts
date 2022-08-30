import { Video } from '@prisma/client';
import { channels } from '../seed-data';

const videosNoChannels: Omit<Video, 'updatedAt' | 'createdAt' | 'channelId' | 'publishedAt' | 'scheduledStreamDate'>[] =
  [
    {
      'id': '90862886-dab4-4777-9b1d-62a0f541559e',
      'name': 'Meet the CEO: Artem Goncharov (Binary Studio Official Video)',
      'description':
        'In this video, our CEO Artem Goncharov talks about our different types of services and explains how Binary Studio delivers business value to customers by fostering strategic long-term partnerships.',
      'status': 'finished',
      'videoPath': 'https://dev.streamlet.tk/segments/1/master.m3u8',
      'liveViews': 0,
      'videoViews': 180,
      'duration': 173,
      'poster':
        'https://scontent.flwo6-1.fna.fbcdn.net/v/t39.30808-6/285270507_1483328318791583_463444811077561983_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=EUXjv97KYh8AX9XNIbB&_nc_ht=scontent.flwo6-1.fna&oh=00_AT_5vuylsFZYcRnSkcgL71DPpQuzjvK0fP8vJltbfNv8yQ&oe=630EA310',
    },
    {
      'id': '34165be6-6ac0-4537-a857-cc0646d2620e',
      'name': 'Testimonial: David Burton, CEO of FanAngel | Binary Studio',
      'description':
        'FanAngel is a crowdfunding platform for sport enthusiasts that allows to pledge donations based on the performance of athletes. Binary Studio played a key role in transforming the project from its initial version into a high-performance platform, capable to serve more than 3000 users per second. Being an extension of FanAngels internal team for more than 3 years, our engineers managed to: - rebuild the RESTful API; - extend it with new capabilities; - re-design the project architecture; - set up a scalable database environment.',
      'status': 'finished',
      'videoPath': 'https://dev.streamlet.tk/segments/2/master.m3u8',
      'liveViews': 0,
      'videoViews': 154,
      'duration': 121,
      'poster': 'https://img.youtube.com/vi/wxRfGOJE778/maxresdefault.jpg',
    },
    {
      'id': '3400139d-e0fd-49ab-ac52-be4d72f9b10b',
      'name': 'Testimonial: Pascal Desmarets, Founder & CEO of Hackolade | Binary Studio',
      'description':
        'Hackolade is a revolutionary data modeling tool that introduces traditional database design concepts to NoSQL databases based on JSON Documents. Binary Studio has been working with Hackolade for more than 3 years. Our engineers were responsible for the entire development of the application, including: - Conception and management of adequate development and release processes that ensured the timely delivery of the MVP application; - Implementation of a complex, highly performant desktop application for Windows, macOS and Linux; - Development of reverse engineering functionality; - Implementation of a rich user interface for visual modeling tools; - Integrations for different version of MongoDB. See case study here: https://binary-studio.com/case-studie...',
      'status': 'finished',
      'videoPath': 'https://dev.streamlet.tk/segments/3/master.m3u8',
      'liveViews': 0,
      'videoViews': 201,
      'duration': 161,
      'poster':
        'https://scontent.flwo6-1.fna.fbcdn.net/v/t39.30808-6/285270507_1483328318791583_463444811077561983_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=EUXjv97KYh8AX9XNIbB&_nc_ht=scontent.flwo6-1.fna&oh=00_AT_5vuylsFZYcRnSkcgL71DPpQuzjvK0fP8vJltbfNv8yQ&oe=630EA310',
    },
    {
      'id': '76746c5b-e552-40ba-8d9a-247428386caf',
      'name': 'Testimonial: James Tetler, Engineering Manager at MassageBook | Binary Studio',
      'description':
        'MassageBook is the leading online platform for massage therapists and bodywork professionals in the US. It offers an all-in-one business management solution with tools for practice management, online scheduling, intake forms, email campaigns and more. 6-years collaboration of Binary Studio and MassageBook has evolved into strategic partnership. As integral part of MassageBooks development team, Binary Studio engineers are responsible for entire software development process: - Planning and developing application modules architecture. - Implementing business logic on the back-end. - Developing API services and front-end functionality. - Developing native applications for mobile devices. - Building modules to connect Massage Book with',
      'status': 'finished',
      'videoPath': 'https://dev.streamlet.tk/segments/4/master.m3u8',
      'liveViews': 0,
      'videoViews': 268,
      'duration': 148,
      'poster': 'https://img.youtube.com/vi/M25h9FGQ1BU/maxresdefault.jpg',
    },
    {
      'id': '67105c20-233e-48de-a8b6-c9a10be83824',
      'name': 'Binary Studio Summer Trip | 2019',
      'description':
        'Binary Studio team travels to one of the peaks of Koprowski Shtit, near the Slovak region. Prepare to watch our journey - 18 kilometers of trekking, 10 hours under the rain, hail and the stinging sun',
      'status': 'finished',
      'videoPath': 'https://dev.streamlet.tk/segments/5/master.m3u8',
      'liveViews': 0,
      'videoViews': 1369,
      'duration': 62,
      'poster': 'https://img.youtube.com/vi/teyjpbvxB3I/maxresdefault.jpg',
    },
    {
      'id': 'f5c7b2e5-fd35-4092-80ac-a1cea1d7cacb',
      'name': 'Binary Studio Eurotrip 2018',
      'description':
        'Every December, Binary Studio sets off on a week-long adventure. This years Eurotrip included opulent Vienna, cozy Stuttgart, savory Strasbourg and fantastisch Frankfurt. We believe weve learned how to correctly identify a city just by tasting its particular version of glühwein :D Dive into this 80 second adventure with us!',
      'status': 'finished',
      'videoPath': 'https://dev.streamlet.tk/segments/6/master.m3u8',
      'liveViews': 0,
      'videoViews': 172,
      'duration': 78,
      'poster': 'https://img.youtube.com/vi/B322okjRyoo/maxresdefault.jpg',
    },
    {
      'id': 'e7b87a26-4ade-4209-9222-24dfe36b08f5',
      'name': 'Binary Studio Eurotrip 2019',
      'description':
        'Every December, Binary Studio sets off on a week-long adventure. This years Eurotrip included opulent Vienna, cozy Stuttgart, savory Strasbourg and fantastisch Frankfurt. We believe weve learned how to correctly identify a city just by tasting its particular version of glühwein :D Dive into this 80 second adventure with us!',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=A6yDb9FGB9A',
      'liveViews': 0,
      'videoViews': 1378,
      'duration': 79,
      'poster': 'https://img.youtube.com/vi/A6yDb9FGB9A/maxresdefault.jpg',
    },
    {
      'id': 'e7b87a26-4ade-4209-9422-24dff36b08f5',
      'name': 'Binary Studio June Trip | 2021',
      'description': 'This June we went for a water trip! Enjoy beatiful river landscapes with us',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=sNDw4Khjymg',
      'liveViews': 0,
      'videoViews': 1378,
      'duration': 232,
      'poster': 'https://img.youtube.com/vi/sNDw4Khjymg/maxresdefault.jpg',
    },
    {
      'id': 'b3b82a26-4ade-4209-9222-24dfe36b08f5',
      'name': 'Elasticsearch. Bohdan Rusinka',
      'description':
        'Bohdan Rusinka, JS Tech Lead Binary Studio and coach in the Binary Studio Academy, analyzes the most popular search system for commercial development - Elasticsearch',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=gPUX1oRtxPM',
      'liveViews': 0,
      'videoViews': 128,
      'duration': 25804,
      'poster': 'https://img.youtube.com/vi/gPUX1oRtxPM/maxresdefault.jpg',
    },
    {
      'id': 'rt787a26-4ade-4201-9222-24dfe36b08f5',
      'name': 'What I wanted to know on my first project',
      'description': 'Dmytro Beseda, JS Tech Lead Binary Studio shares his insights with students',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=HflguE7T1Nw',
      'liveViews': 0,
      'videoViews': 1328,
      'duration': 4084,
      'poster': 'https://img.youtube.com/vi/HflguE7T1Nw/maxresdefault.jpg',
    },
    {
      'id': 'sh787a26-4adv-4209-9173-24dfe36b08f5',
      'name': 'Divide et impera',
      'description':
        'Maksym Honcharuk, .Net Tech Lead Binary Studio shares his knowledge about creation of the distributed systems',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=ocsOap0TGh0',
      'liveViews': 0,
      'videoViews': 451,
      'duration': 4437,
      'poster': 'https://img.youtube.com/vi/ocsOap0TGh0/maxresdefault.jpg',
    },
    {
      'id': 'h4a87a26-4ade-4209-9222-24dfe36b08f5',
      'name': 'Submit .Net how to work with monolith architecture',
      'description':
        'Agenda: 4:23 - Modular Monolith by Yurii Palaida (.NET engineer Binary Studio) 56:05 - Building monolith application with Peasy.NET by Anton Matsyshyn (.NET engineer, coach Binary Studio Academy)',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=8r0a_jbq7Cg',
      'liveViews': 0,
      'videoViews': 231,
      'duration': 5182,
      'poster': 'https://img.youtube.com/vi/8r0a_jbq7Cg/maxresdefault.jpg',
    },
    {
      'id': 'e7b87k17-4ade-4109-9222-24dfe36b08f5',
      'name': 'How to find balance in work',
      'description':
        'Follow Us Online! • Facebook: https://www.facebook.com/Binary.Studi... • LinkedIn: https://www.linkedin.com/company/bina... • Twitter: https://twitter.com/Binary_Studio • Telegram: https://t.me/bsacademy • Instagram: https://www.instagram.com/binary_studio/ • Blog: https://binary-studio.com/blog/',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=fJM__YM-Udw',
      'liveViews': 0,
      'videoViews': 231,
      'duration': 7340,
      'poster': 'https://img.youtube.com/vi/fJM__YM-Udw/maxresdefault.jpg',
    },
    {
      'id': 'w7b87a26-4adw-4211-9222-24dfe36b08f5',
      'name': 'Binary Studio Academy graduation demo',
      'description':
        'Binary Studio Academy is a free educational project aimed at helping young university graduates start their career in IT. Academy is held online. Students after passing a selection process spent 2-3 months of summer studying intensively and participating in real project development from scratch. After graduation every student receives Certificate of Achievement and most talented are offered a position of Junior Developer at Binary Studio.',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=ak-XDpkGbbM',
      'liveViews': 0,
      'videoViews': 356,
      'duration': 144,
      'poster':
        'https://scontent.flwo6-1.fna.fbcdn.net/v/t39.30808-6/285270507_1483328318791583_463444811077561983_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=EUXjv97KYh8AX9XNIbB&_nc_ht=scontent.flwo6-1.fna&oh=00_AT_5vuylsFZYcRnSkcgL71DPpQuzjvK0fP8vJltbfNv8yQ&oe=630EA310',
    },
    {
      'id': 'e7b87m91-4ade-4209-9222-24dfe45b08s9',
      'name': 'Binary Studio Academy 2021 | Graduation',
      'description': '',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=q6CkUzKRFSk',
      'liveViews': 0,
      'videoViews': 251,
      'duration': 97,
      'poster': 'https://img.youtube.com/vi/q6CkUzKRFSk/maxresdefault.jpg',
    },
    {
      'id': 'e7b87a26-4add-1229-9222-24dfe36b08f5',
      'name': 'Submit JS - what are HTTP3, UDP, TCP',
      'description':
        'Follow Us Online! • Facebook: https://www.facebook.com/Binary.Studi... • LinkedIn: https://www.linkedin.com/company/bina... • Twitter: https://twitter.com/Binary_Studio • Telegram: https://t.me/bsacademy • Instagram: https://www.instagram.com/binary_studio/ • Blog: https://binary-studio.com/blog/',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=fFQV9BXpm1M',
      'liveViews': 0,
      'videoViews': 251,
      'duration': 6930,
      'poster': 'https://img.youtube.com/vi/fFQV9BXpm1M/maxresdefault.jpg',
    },
    {
      'id': 'e7b87a21-4ase-4209-0022-24dfe36b08f5',
      'name': 'Meet our Team! (Binary Studio Official Video)',
      'description':
        'Binary Studio is a Ukrainian software development agency focusing on complex software solutions. Our strong technical culture, the company’s friendly atmosphere and challenging projects attract top local talents. We create great development opportunities for our employees and make sure they stay committed over the long term. Learn more at http://binary-studio.com/',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=JZLu-AdTKdQ',
      'liveViews': 0,
      'videoViews': 1000,
      'duration': 142,
      'poster':
        'https://scontent.flwo6-1.fna.fbcdn.net/v/t39.30808-6/285270507_1483328318791583_463444811077561983_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=EUXjv97KYh8AX9XNIbB&_nc_ht=scontent.flwo6-1.fna&oh=00_AT_5vuylsFZYcRnSkcgL71DPpQuzjvK0fP8vJltbfNv8yQ&oe=630EA310',
    },
    {
      'id': 'e7b87a26-4ade-4209-9222-24dfe36b00c7',
      'name': 'Testimonial: Daragh OShea, Co Founder & CTO of Dynamic Reservations | Binary Studio',
      'description':
        'Dynamic Reservations is a technology startup partnering with Binary Studio for more than 1.5 years to develop an innovative booking platform for travel agencies. Binary Studio engineers helped client build the whole user interface, and provide frontend and backend support. Our involvement: - Implementation of internal APIs for the communication between backend services. - Integration of third-party APIs for booking systems and other external services. - Development of Access & Identity Management functionality. - Development of the user interface for itinerary compilation (hotels, flights, car rentals, leisure activities, etc.), including PDF export functionality. - Implementation of a basic CRM solution.',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=XINU3TRXDsY',
      'liveViews': 0,
      'videoViews': 1020,
      'duration': 141,
      'poster': 'https://img.youtube.com/vi/XINU3TRXDsY/maxresdefault.jpg',
    },
    {
      'id': 'e7b87a26-4ade-4209-0122-24dfe36n08e5',
      'name': 'Testimonial: Mark Volkmann, CEO of MassageBook | Binary Studio',
      'description':
        'MassageBook is the leading online platform for massage therapists and bodywork professionals in the US. It offers an all-in-one business management solution with tools for practice management, online scheduling, intake forms, email campaigns and more. 6-years collaboration of Binary Studio and MassageBook has evolved into strategic partnership. Binary Studio is largely responsible for Massage Books entire software development process: - Planning and developing application modules architecture. - Implementing business logic on the back-end. - Developing API services and front-end functionality. - Developing native applications for mobile devices. - Building modules to connect Massage Book with third-party services (Stripe, Google Calendar, Social Networks, etc.). - Solution Integrations for communication with hardware.',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=m_sOrxiC5ZU',
      'liveViews': 0,
      'videoViews': 922,
      'duration': 137,
      'poster': 'https://img.youtube.com/vi/m_sOrxiC5ZU/maxresdefault.jpg',
    },
    {
      'id': 'e7b87l09-4ade-4209-9111-12dfs34b08f5',
      'name': 'Binary Studio Academy',
      'description': 'Find out more about our academy',
      'status': 'finished',
      'videoPath': 'https://www.youtube.com/watch?v=roHLJEoC2H8',
      'liveViews': 0,
      'videoViews': 362,
      'duration': 49,
      'poster': 'https://img.youtube.com/vi/roHLJEoC2H8/maxresdefault.jpg',
    },
  ];

const channelIndices = Array.from(videosNoChannels, () => Math.floor(Math.random() * channels.length));

export const videos: Omit<Video, 'updatedAt' | 'createdAt' | 'publishedAt' | 'scheduledStreamDate'>[] =
  videosNoChannels.map((video, index) => ({
    ...video,
    channelId: channels[channelIndices[index]].id,
  }));
