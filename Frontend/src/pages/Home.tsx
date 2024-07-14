import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

interface Event {
    title: string;
    date: string;
    location: string;
    description: string;
    createdBy: string;
    booked: boolean;
}

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/event');
            setEvents(response.data);
            console.log(response.data, 'is getting or', events);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('Form submitted');

        const formData = new FormData(e.currentTarget);
        const eventData = {
            title: formData.get('title'),
            date: formData.get('date'),
            location: formData.get('location'),
            description: formData.get('description'),
        };

        console.log(eventData, 'is getting or not');
        try {
            const response = await axios.post('http://localhost:3001/event/adding', eventData, { withCredentials: true });
            console.log('Event created:', response.data);
            setIsModalOpen(false);
            getData(); // Refresh events list after adding a new event
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleBookEvent = async (event: Event) => {
        try {
            const response = await axios.post('http://localhost:3001/event/booking', event, { withCredentials: true });
            if (response.data.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Event Booked Successfully!',
                    text: 'Thank you for booking the event.',
                    confirmButtonText: 'OK',
                });
                getData(); // Refresh events list after booking
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while booking the event. Please try again later.',
            });
        }
    };

    return (
        <section className="bg-white min-h-screen py-10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600">UCEFEZ EVENT PLANNER</h1>
                    <button
                        onClick={toggleModal}
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Add Event
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed top-0 left-0 z-50 w-full h-full bg-blue-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-blue-800 rounded-lg shadow-lg p-8 max-w-md w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-3xl font-bold text-white">
                                    Create New Event
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    className="text-gray-400 hover:text-gray-300"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-200">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Event Title"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-200">Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-200">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Event Location"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-200">Description</label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={4}
                                        className="mt-1 block w-full p-3 border rounded-lg bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Event Description"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                                >
                                    Add Event
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="mt-10">
                    {/* <h2 className="text-3xl font-bold text-blue-600">Upcoming Events</h2> */}
                    <ul className="space-y-4">
                    {events.map((event, index) => (
    <li
        key={index}
        className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 relative dark:bg-gray-900 dark:border-gray-700"
    >
        {/* Checkmark icon for booked events */}
        {event.booked && (
            <svg
                className="absolute top-2 right-2 w-6 h-6 text-blue-500 dark:text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        )}
        {/* Event title */}
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{event.title}</h3>
        {/* Event details */}
        <p className="text-gray-700 dark:text-gray-300">Date: {event.date}</p>
        <p className="text-gray-700 dark:text-gray-300">Location: {event.location}</p>
        <p className="text-gray-700 dark:text-gray-300">Description: {event.description}</p>
        <p className="text-gray-700 dark:text-gray-300">Created By: {event.createdBy}</p>
        {/* Button for booking the event */}
        <button
            disabled={event.booked}
            onClick={() => handleBookEvent(event)}
            className={`mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300 ${event.booked ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {event.booked ? 'Booked' : 'Book Event'}
        </button>
    </li>
))}

                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Home;
