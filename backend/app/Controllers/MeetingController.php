<?php

namespace App\Controllers;

use App\Services\MeetingService;

class MeetingController
{
    protected $meetingService;

    public function __construct()
    {
        $this->meetingService = new MeetingService();
    }

    /**
     * Get all meetings from external API
     */
    public function index()
    {
        try {
            $meetings = $this->meetingService->fetchMeetings();
            \Flight::json($meetings);
        } catch (\Exception $e) {
            \Flight::json([
                'error' => 'Failed to fetch meetings',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
