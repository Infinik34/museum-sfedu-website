import EventsCalendar from "../components/EventCalendar";


export default function EventsPage() {
    return (
        <main className="min-h-screen bg-museum-dark text-white py-16 px-4 flex flex-col items-center">
            <header className="mb-12 text-center max-w-2xl">
                <h1 className="text-4xl md:text-5xl mb-4">Календарь событий</h1>
                <p className="text-gray-400 text-lg">
                    Выберите дату, чтобы узнать подробности о мероприятии.
                </p>
            </header>
            <EventsCalendar />
        </main>
    );
}