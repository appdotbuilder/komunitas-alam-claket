<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'event_date' => 'required|date|after:now',
            'max_participants' => 'required|integer|min:1|max:100',
            'price' => 'required|numeric|min:0',
            'difficulty_level' => 'required|in:beginner,intermediate,advanced',
            'equipment_needed' => 'nullable|string',
            'meeting_point' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Event title is required.',
            'description.required' => 'Event description is required.',
            'location.required' => 'Event location is required.',
            'event_date.required' => 'Event date is required.',
            'event_date.after' => 'Event date must be in the future.',
            'max_participants.required' => 'Maximum participants is required.',
            'max_participants.min' => 'At least 1 participant is required.',
            'price.required' => 'Event price is required.',
            'price.min' => 'Price cannot be negative.',
        ];
    }
}