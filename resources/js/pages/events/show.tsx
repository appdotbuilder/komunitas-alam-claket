import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { type SharedData } from '@/types';

interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    latitude?: number;
    longitude?: number;
    event_date: string;
    max_participants: number;
    price: number;
    difficulty_level: string;
    equipment_needed?: string;
    meeting_point?: string;
    organizer: {
        id: number;
        name: string;
        email: string;
    };
    participants: Array<{
        id: number;
        status: string;
        user: {
            name: string;
        };
    }>;
}

interface Props {
    event: Event;
    isParticipating: boolean;
    [key: string]: unknown;
}

export default function EventShow({ event, isParticipating }: Props) {
    const { auth } = usePage<SharedData>().props;
    
    const handleJoinEvent = () => {
        router.post(route('events.join', event.id), {}, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleLeaveEvent = () => {
        router.delete(route('events.leave', event.id), {
            preserveState: true,
            preserveScroll: true
        });
    };

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

    const confirmedParticipants = event.participants.filter(p => p.status === 'confirmed').length;
    const spotsLeft = event.max_participants - confirmedParticipants;

    return (
        <AppShell>
            <Head title={`${event.title} - Claket Nature`} />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back button */}
                    <Link 
                        href={route('events.index')}
                        className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
                    >
                        ← Kembali ke Kegiatan
                    </Link>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6 text-white">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                                    <div className="flex items-center space-x-4 text-green-100">
                                        <span>📍 {event.location}</span>
                                        <span>📅 {new Date(event.event_date).toLocaleDateString('id-ID')}</span>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(event.difficulty_level).replace('text-green-800', 'text-white').replace('text-yellow-800', 'text-white').replace('text-red-800', 'text-white')}`}>
                                    {event.difficulty_level.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <div className="p-8">
                            {/* Event Info Grid */}
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Deskripsi</h2>
                                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">📊 Info Kegiatan</h3>
                                        <div className="space-y-2 text-sm">
                                            <div>💰 <strong>Biaya:</strong> {event.price === 0 ? 'GRATIS' : formatPrice(event.price)}</div>
                                            <div>👥 <strong>Kapasitas:</strong> {event.max_participants} peserta</div>
                                            <div>✅ <strong>Terdaftar:</strong> {confirmedParticipants} orang</div>
                                            <div>🎯 <strong>Sisa Slot:</strong> {spotsLeft} tempat</div>
                                            <div>👤 <strong>Organizer:</strong> {event.organizer.name}</div>
                                        </div>
                                    </div>
                                    
                                    {auth.user && (
                                        <div className="space-y-2">
                                            {isParticipating ? (
                                                <button
                                                    onClick={handleLeaveEvent}
                                                    className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                                >
                                                    ❌ Batal Ikut
                                                </button>
                                            ) : spotsLeft > 0 ? (
                                                <button
                                                    onClick={handleJoinEvent}
                                                    className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                                >
                                                    ✅ Ikut Kegiatan
                                                </button>
                                            ) : (
                                                <div className="w-full px-4 py-3 bg-gray-400 text-white rounded-lg font-medium text-center">
                                                    😔 Kegiatan Penuh
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {event.equipment_needed && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">🎒 Perlengkapan yang Diperlukan</h3>
                                        <p className="text-gray-600 leading-relaxed">{event.equipment_needed}</p>
                                    </div>
                                )}
                                
                                {event.meeting_point && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">📍 Titik Kumpul</h3>
                                        <p className="text-gray-600 leading-relaxed">{event.meeting_point}</p>
                                    </div>
                                )}
                            </div>

                            {/* Participants List */}
                            {event.participants.length > 0 && (
                                <div className="mt-8 pt-8 border-t">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        👥 Peserta ({event.participants.length})
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {event.participants.map((participant) => (
                                            <div 
                                                key={participant.id}
                                                className="bg-gray-50 rounded-lg px-3 py-2 text-sm"
                                            >
                                                <div className="font-medium">{participant.user.name}</div>
                                                <div className="text-xs text-gray-500 capitalize">
                                                    {participant.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}