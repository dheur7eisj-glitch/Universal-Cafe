package com.universalcafe;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Universal Cafe — Reservation REST Controller
 *
 * Endpoints:
 *   POST /api/reservations     — Submit a new table reservation
 *   GET  /api/reservations     — List all reservations (admin use)
 *   GET  /api/health           — Health check
 *
 * Frontend integration:
 *   Replace the fakeDelay() in main.js with:
 *
 *   const res = await fetch('/api/reservations', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(formData)
 *   });
 *   if (!res.ok) throw new Error('Booking failed');
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://localhost:5500",
    "https://universalcafe.in",
    "https://www.universalcafe.in"
})
public class ReservationController {

    private static final Logger log = Logger.getLogger(ReservationController.class.getName());

    // In-memory store (replace with JPA/DB in production)
    private final java.util.List<Map<String, Object>> reservations = new java.util.ArrayList<>();

    /**
     * POST /api/reservations
     * Submit a table reservation from the website form.
     *
     * Request Body (JSON):
     * {
     *   "name":     "Rohit Kumar",
     *   "phone":    "9876543210",
     *   "email":    "rohit@example.com",
     *   "guests":   "2",
     *   "date":     "2025-12-25",
     *   "time":     "19:00",
     *   "occasion": "birthday",
     *   "notes":    "Window seat preferred"
     * }
     *
     * Response (JSON):
     * {
     *   "success":  true,
     *   "message":  "Reservation confirmed! We'll WhatsApp you shortly.",
     *   "refId":    "UC-20251225-0001",
     *   "timestamp":"2025-12-24T10:30:00"
     * }
     */
    @PostMapping("/reservations")
    public ResponseEntity<Map<String, Object>> createReservation(
            @Valid @RequestBody ReservationRequest request) {

        log.info("New reservation from: " + request.getName() + " | " + request.getDate());

        // Build response
        Map<String, Object> response = new HashMap<>();

        // Generate reference ID
        String refId = "UC-" +
            request.getDate().format(DateTimeFormatter.ofPattern("yyyyMMdd")) +
            "-" + String.format("%04d", reservations.size() + 1);

        // Store reservation (in production: save to DB via JPA)
        Map<String, Object> saved = new HashMap<>();
        saved.put("refId",     refId);
        saved.put("name",      request.getName());
        saved.put("phone",     request.getPhone());
        saved.put("email",     request.getEmail());
        saved.put("guests",    request.getGuests());
        saved.put("date",      request.getDate().toString());
        saved.put("time",      request.getTime().toString());
        saved.put("occasion",  request.getOccasion());
        saved.put("notes",     request.getNotes());
        saved.put("createdAt", LocalDateTime.now().toString());
        reservations.add(saved);

        // TODO: Send WhatsApp confirmation via Twilio or Meta Business API
        // TODO: Send email confirmation via JavaMail / SendGrid
        // TODO: Notify café staff via Telegram Bot or SMS

        response.put("success",   true);
        response.put("message",   "Reservation confirmed! We'll WhatsApp you within 30 minutes. 🎉");
        response.put("refId",     refId);
        response.put("timestamp", LocalDateTime.now().toString());

        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/reservations
     * List all reservations (for internal admin use — secure in production with auth)
     */
    @GetMapping("/reservations")
    public ResponseEntity<Map<String, Object>> listReservations() {
        Map<String, Object> response = new HashMap<>();
        response.put("total",        reservations.size());
        response.put("reservations", reservations);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/health
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status",  "UP");
        response.put("service", "Universal Cafe API");
        response.put("version", "1.0.0");
        return ResponseEntity.ok(response);
    }
}
