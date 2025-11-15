<?php

namespace App\Services;

class MeetingService
{
    protected $apiUrl = 'https://mixtend.github.io/schedule.json';

    /**
     * Fetch meetings from external API
     *
     * @return array
     */
    public function fetchMeetings()
    {
        $ch = curl_init($this->apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, getenv('USER_AGENT'));
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            curl_close($ch);
            throw new \Exception('Failed to fetch data from external API: ' . $error);
        }
        
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new \Exception('Failed to fetch data from external API. HTTP Status: ' . $httpCode);
        }

        $data = json_decode($response, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('Failed to parse JSON response');
        }

        // Log API response
        $logFile = __DIR__ . '/../../storage/logs/api_response.log';
        $logDir = dirname($logFile);
        
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }
        
        $logEntry = sprintf(
            "[%s] API Response: %s\n",
            date('Y-m-d H:i:s'),
            json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
        
        file_put_contents($logFile, $logEntry, FILE_APPEND);

        return $data;
    }
}
