import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { type SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    const stats = [
        { label: 'Kegiatan Diikuti', value: '3', icon: '🏕️', color: 'bg-green-500' },
        { label: 'Rute Dibuat', value: '2', icon: '🗺️', color: 'bg-blue-500' },
        { label: 'Thread Forum', value: '5', icon: '💬', color: 'bg-purple-500' },
        { label: 'Foto Dibagikan', value: '12', icon: '📸', color: 'bg-amber-500' },
    ];

    const quickActions = [
        { label: 'Buat Kegiatan', href: '/events/create', icon: '➕', color: 'bg-green-600 hover:bg-green-700' },
        { label: 'Upload Foto', href: '/gallery/create', icon: '📷', color: 'bg-blue-600 hover:bg-blue-700' },
        { label: 'Forum Diskusi', href: '/forum', icon: '💭', color: 'bg-purple-600 hover:bg-purple-700' },
        { label: 'Buat Rute', href: '/routes/create', icon: '🧭', color: 'bg-amber-600 hover:bg-amber-700' },
    ];

    const recentActivities = [
        { type: 'event', title: 'Hiking Gunung Bromo', time: '2 jam yang lalu', icon: '🏔️' },
        { type: 'forum', title: 'Membalas thread "Tips Camping"', time: '5 jam yang lalu', icon: '💬' },
        { type: 'route', title: 'Membuat rute "Jalur Coban Rais"', time: '1 hari yang lalu', icon: '🗺️' },
        { type: 'media', title: 'Upload 3 foto ekspedisi', time: '2 hari yang lalu', icon: '📸' },
    ];

    return (
        <AppShell>
            <Head title="Dashboard - Claket Nature" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-green-800 mb-2">
                            Selamat datang kembali, {auth.user?.name}! 👋
                        </h1>
                        <p className="text-lg text-gray-600">
                            Mari lanjutkan petualangan alam Anda dengan komunitas Claket Nature
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-gray-600 text-sm">{stat.label}</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-white text-xl`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">🚀 Aksi Cepat</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {quickActions.map((action, index) => (
                                <Link
                                    key={index}
                                    href={action.href}
                                    className={`${action.color} text-white rounded-xl p-4 text-center transition-colors group`}
                                >
                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                                        {action.icon}
                                    </div>
                                    <div className="font-medium text-sm">{action.label}</div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Recent Activities */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">📋 Aktivitas Terbaru</h2>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="text-2xl">{activity.icon}</div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{activity.title}</p>
                                            <p className="text-gray-500 text-sm">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Community Highlights */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">✨ Highlight Komunitas</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                                    <h3 className="font-semibold text-green-800 mb-2">🏕️ Event Mendatang</h3>
                                    <p className="text-gray-600 text-sm mb-2">Hiking Gunung Semeru - 15 Januari 2024</p>
                                    <Link href="/events" className="text-green-600 hover:text-green-700 text-sm font-medium">
                                        Lihat semua kegiatan →
                                    </Link>
                                </div>
                                
                                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                                    <h3 className="font-semibold text-purple-800 mb-2">💬 Forum Trending</h3>
                                    <p className="text-gray-600 text-sm mb-2">"Tips Mendaki untuk Pemula" - 45 replies</p>
                                    <Link href="/forum" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                                        Ikut diskusi →
                                    </Link>
                                </div>
                                
                                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                                    <h3 className="font-semibold text-amber-800 mb-2">📸 Foto Minggu Ini</h3>
                                    <p className="text-gray-600 text-sm mb-2">Sunrise di Puncak Mahameru</p>
                                    <Link href="/gallery" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                                        Lihat galeri →
                                    </Link>
                                </div>
                                
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                    <h3 className="font-semibold text-blue-800 mb-2">📚 Konten Edukasi Baru</h3>
                                    <p className="text-gray-600 text-sm mb-2">Panduan Navigation dengan Kompas</p>
                                    <Link href="/education" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                        Baca artikel →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">🧭 Jelajahi Komunitas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Link href="/events" className="group p-6 border border-green-200 rounded-xl hover:shadow-lg transition-all">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🏕️</div>
                                <h3 className="font-semibold text-gray-900 mb-2">Kegiatan Outdoor</h3>
                                <p className="text-gray-600 text-sm">Ikuti hiking, camping, dan ekspedisi alam</p>
                            </Link>
                            
                            <Link href="/routes" className="group p-6 border border-blue-200 rounded-xl hover:shadow-lg transition-all">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🗺️</div>
                                <h3 className="font-semibold text-gray-900 mb-2">Rute Ekspedisi</h3>
                                <p className="text-gray-600 text-sm">Jelajahi rute petualangan terbaik</p>
                            </Link>
                            
                            <Link href="/forum" className="group p-6 border border-purple-200 rounded-xl hover:shadow-lg transition-all">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💬</div>
                                <h3 className="font-semibold text-gray-900 mb-2">Forum Diskusi</h3>
                                <p className="text-gray-600 text-sm">Berbagi pengalaman dengan komunitas</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}