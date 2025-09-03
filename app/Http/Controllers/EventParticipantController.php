<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventParticipantController extends Controller
{
    /**
     * Join an event.
     */
    public function store(Request $request, Event $event)
    {
        $user = auth()->user();

        // Check if already participating
        if ($event->participants()->where('user_id', $user->id)->exists()) {
            return back()->with('error', 'You are already registered for this event.');
        }

        // Check if event is full
        $currentParticipants = $event->participants()->where('status', 'confirmed')->count();
        if ($currentParticipants >= $event->max_participants) {
            return back()->with('error', 'This event is full.');
        }

        EventParticipant::create([
            'event_id' => $event->id,
            'user_id' => $user->id,
            'status' => 'pending',
            'notes' => $request->input('notes'),
        ]);

        return back()->with('success', 'Successfully registered for the event!');
    }

    /**
     * Leave an event.
     */
    public function destroy(Event $event)
    {
        $participant = $event->participants()
            ->where('user_id', auth()->id())
            ->first();

        if (!$participant) {
            return back()->with('error', 'You are not registered for this event.');
        }

        $participant->delete();

        return back()->with('success', 'Successfully left the event.');
    }
}