<?php

use App\Http\Controllers\EducationalContentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventParticipantController;
use App\Http\Controllers\ExpeditionRouteController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\MediaGalleryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public routes
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');
Route::get('/routes', [ExpeditionRouteController::class, 'index'])->name('routes.index');
Route::get('/routes/{route}', [ExpeditionRouteController::class, 'show'])->name('routes.show');
Route::get('/gallery', [MediaGalleryController::class, 'index'])->name('gallery.index');
Route::get('/gallery/{media}', [MediaGalleryController::class, 'show'])->name('gallery.show');
Route::get('/education', [EducationalContentController::class, 'index'])->name('education.index');
Route::get('/education/{content}', [EducationalContentController::class, 'show'])->name('education.show');
Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');
Route::get('/forum/{category}', [ForumController::class, 'show'])->name('forum.category');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Event management
    Route::resource('events', EventController::class)->except(['index', 'show']);
    Route::post('/events/{event}/join', [EventParticipantController::class, 'store'])->name('events.join');
    Route::delete('/events/{event}/leave', [EventParticipantController::class, 'destroy'])->name('events.leave');

    // Route management
    Route::resource('routes', ExpeditionRouteController::class)->except(['index', 'show']);

    // Forum management
    Route::get('/forum/create', [App\Http\Controllers\ForumThreadController::class, 'create'])->name('forum.create');
    Route::post('/forum', [App\Http\Controllers\ForumThreadController::class, 'store'])->name('forum.store');
    Route::get('/forum/{category}/{thread}', [App\Http\Controllers\ForumThreadController::class, 'show'])->name('forum.threads.show');
    Route::post('/forum/{thread}/replies', [App\Http\Controllers\ForumReplyController::class, 'store'])->name('forum.reply.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
