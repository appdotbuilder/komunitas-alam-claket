import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Route {
    id: number;
    name: string;
    description: string;
    distance_km: number;
    estimated_duration_hours: number;
    difficulty_level: string;
    is_verified: boolean;
    creator: {
        name: string;
    };
}

interface Props {
    routes: {
        data: Route[];
        links: unknown[];
        meta: unknown;
    };
    [key: string]: unknown;
}

export default function RoutesIndex({ routes }: Props) {
    const getDifficultyColor = (level: string) => {
        switch (level) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'moderate': return 'bg-yellow-100 text-yellow-800';
            case 'challenging': return 'bg-orange-100 text-orange-800';
            case 'extreme': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppShell>
            <Head title="Rute Ekspedisi - Claket Nature" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-green-800 mb-4">
                            🗺️ Rute Ekspedisi
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl">
                            Jelajahi rute-rute terbaik yang telah diverifikasi oleh para ahli. 
                            Temukan petualangan sesuai tingkat kemampuan Anda!
                        </p>
                    </div>

                    {/* Routes Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {routes.data.map((route) => (
                            <div key={route.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                                            {route.name}
                                        </h3>
                                        <div className="flex items-center space-x-1">
                                            {route.is_verified && (
                                                <span className="text-blue-500 text-sm">✅</span>
                                            )}
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(route.difficulty_level)}`}>
                                                {route.difficulty_level}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {route.description}
                                    </p>
                                    
                                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center">
                                            <span className="mr-2">📏</span>
                                            {route.distance_km} km
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">⏱️</span>
                                            {route.estimated_duration_hours} jam
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">👤</span>
                                            Dibuat oleh: {route.creator.name}
                                        </div>
                                    </div>
                                    
                                    <Link
                                        href={`/routes/${route.id}`}
                                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Lihat Rute 🧭
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No routes message */}
                    {routes.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🗺️</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Belum ada rute tersedia
                            </h3>
                            <p className="text-gray-500">
                                Rute ekspedisi akan segera ditambahkan. Pantai terus untuk update terbaru!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}