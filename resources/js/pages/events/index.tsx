import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    event_date: string;
    max_participants: number;
    price: number;
    difficulty_level: string;
    organizer: {
        name: string;
    };
}

interface Props {
    events: {
        data: Event[];
        links: unknown[];
        meta: unknown;
    };
    [key: string]: unknown;
}

export default function EventsIndex({ events }: Props) {
    const getDifficultyColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);
    };

    return (
        <AppShell>
            <Head title="Kegiatan Outdoor - Claket Nature" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-green-800 mb-4">
                            🏕️ Kegiatan Outdoor
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl">
                            Temukan petualangan alam yang menakjubkan! Ikuti berbagai kegiatan outdoor 
                            yang diorganisir oleh komunitas pecinta alam terpercaya.
                        </p>
                    </div>

                    {/* Events Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {events.data.map((event) => (
                            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                                            {event.title}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(event.difficulty_level)}`}>
                                            {event.difficulty_level}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {event.description}
                                    </p>
                                    
                                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center">
                                            <span className="mr-2">📍</span>
                                            {event.location}
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">📅</span>
                                            {new Date(event.event_date).toLocaleDateString('id-ID')}
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">👥</span>
                                            Max {event.max_participants} peserta
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">💰</span>
                                            {event.price === 0 ? 'GRATIS' : formatPrice(event.price)}
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">👤</span>
                                            Organizer: {event.organizer.name}
                                        </div>
                                    </div>
                                    
                                    <Link
                                        href={route('events.show', event.id)}
                                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Lihat Detail 🔍
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No events message */}
                    {events.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🏕️</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Belum ada kegiatan
                            </h3>
                            <p className="text-gray-500">
                                Kegiatan outdoor akan segera hadir. Pantau terus untuk update terbaru!
                            </p>
                        </div>
                    )}

                    {/* Pagination would go here if needed */}
                </div>
            </div>
        </AppShell>
    );
}