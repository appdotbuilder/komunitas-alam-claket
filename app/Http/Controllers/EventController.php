<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with('organizer')
            ->published()
            ->upcoming()
            ->orderBy('event_date')
            ->paginate(12);
        
        return Inertia::render('events/index', [
            'events' => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('events/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $event = Event::create([
            ...$request->validated(),
            'organizer_id' => auth()->id(),
        ]);

        return redirect()->route('events.show', $event)
            ->with('success', 'Event created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $event->load(['organizer', 'participants.user', 'mediaGallery' => function ($query) {
            $query->approved()->latest()->take(6);
        }]);

        $isParticipating = auth()->check() && 
            $event->participants()->where('user_id', auth()->id())->exists();

        return Inertia::render('events/show', [
            'event' => $event,
            'isParticipating' => $isParticipating,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        // Check if user can edit this event
        if (auth()->id() !== $event->organizer_id && auth()->user()?->role !== 'admin') {
            abort(403, 'Unauthorized to edit this event.');
        }

        return Inertia::render('events/edit', [
            'event' => $event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        // Check if user can update this event
        if (auth()->id() !== $event->organizer_id && auth()->user()?->role !== 'admin') {
            abort(403, 'Unauthorized to update this event.');
        }

        $event->update($request->validated());

        return redirect()->route('events.show', $event)
            ->with('success', 'Event updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        // Check if user can delete this event
        if (auth()->id() !== $event->organizer_id && auth()->user()?->role !== 'admin') {
            abort(403, 'Unauthorized to delete this event.');
        }

        $event->delete();

        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully!');
    }
}