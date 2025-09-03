import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Komunitas Pecinta Alam Claket">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 via-blue-50 to-amber-50 dark:from-green-900 dark:via-blue-900 dark:to-amber-900">
                {/* Header */}
                <header className="w-full bg-white/80 backdrop-blur-sm border-b border-green-200 dark:bg-green-900/80 dark:border-green-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xl">🏔️</span>
                                </div>
                                <h1 className="text-2xl font-bold text-green-800 dark:text-green-200">
                                    Claket Nature
                                </h1>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        🏠 Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-4 py-2 text-green-700 hover:text-green-800 font-medium dark:text-green-300 dark:hover:text-green-200"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            Join Community
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="text-center mb-16">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                                <span className="text-green-600">🌲 Komunitas</span><br />
                                <span className="text-blue-600">Pecinta Alam</span><br />
                                <span className="text-amber-600">Claket</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Bergabunglah dengan komunitas pecinta alam terbesar di Indonesia! 
                                Jelajahi keindahan alam, ikuti ekspedisi seru, dan berbagi pengalaman 
                                dengan sesama petualang. 🥾⛰️
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-200 dark:bg-green-900/50 dark:border-green-700">
                                <div className="text-4xl mb-4">🏕️</div>
                                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                                    Kegiatan Outdoor
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Ikuti hiking, camping, dan ekspedisi alam yang terorganisir dengan baik. 
                                    Temukan petualangan baru setiap minggu!
                                </p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200 dark:bg-blue-900/50 dark:border-blue-700">
                                <div className="text-4xl mb-4">🗺️</div>
                                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
                                    Rute Ekspedisi
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Jelajahi rute-rute terbaik dengan peta interaktif, tingkat kesulitan, 
                                    dan tips keamanan dari para ahli.
                                </p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200 dark:bg-amber-900/50 dark:border-amber-700">
                                <div className="text-4xl mb-4">💬</div>
                                <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-3">
                                    Forum Diskusi
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Berbagi cerita, tips, dan pengalaman dengan komunitas. 
                                    Dapatkan jawaban untuk semua pertanyaan petualangan Anda!
                                </p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-200 dark:bg-purple-900/50 dark:border-purple-700">
                                <div className="text-4xl mb-4">📸</div>
                                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-3">
                                    Galeri Foto/Video
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Bagikan momen terbaik dari ekspedisi Anda. 
                                    Lihat foto dan video menakjubkan dari seluruh Indonesia!
                                </p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-indigo-200 dark:bg-indigo-900/50 dark:border-indigo-700">
                                <div className="text-4xl mb-4">📚</div>
                                <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
                                    Edukasi Alam
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Pelajari tentang flora, fauna, geologi, dan konservasi alam 
                                    melalui artikel, quiz, dan infografis menarik.
                                </p>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-red-200 dark:bg-red-900/50 dark:border-red-700">
                                <div className="text-4xl mb-4">🔔</div>
                                <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">
                                    Notifikasi Real-time
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Dapatkan update terbaru tentang kegiatan, cuaca, dan 
                                    informasi penting lainnya langsung ke perangkat Anda.
                                </p>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-green-200 dark:bg-green-900/70 dark:border-green-700">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                Siap Memulai Petualangan? 🎒
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                                Bergabunglah dengan ribuan pecinta alam lainnya. Mulai jelajahi keindahan 
                                Indonesia bersama komunitas yang supportive dan berpengalaman!
                            </p>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg font-semibold rounded-xl transition-all transform hover:scale-105"
                                    >
                                        🚀 Daftar Sekarang
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-lg font-semibold rounded-xl transition-all"
                                    >
                                        🔐 Login
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Stats Section */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">1,500+</div>
                                <div className="text-gray-600 dark:text-gray-300">Anggota Aktif</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">250+</div>
                                <div className="text-gray-600 dark:text-gray-300">Kegiatan Selesai</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-amber-600">180+</div>
                                <div className="text-gray-600 dark:text-gray-300">Rute Terverifikasi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">5,000+</div>
                                <div className="text-gray-600 dark:text-gray-300">Foto & Video</div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-green-800 text-white py-8 dark:bg-green-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-green-200">
                            © 2024 Komunitas Pecinta Alam Claket. Dibuat dengan 💚 untuk para petualang Indonesia.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}