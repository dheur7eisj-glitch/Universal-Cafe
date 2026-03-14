package com.universalcafe;

import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Reservation Request Model
 * Maps to the JSON body sent from the frontend reservation form.
 */
public class ReservationRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid 10-digit Indian mobile number")
    private String phone;

    @Email(message = "Enter a valid email address")
    private String email;  // optional

    @NotBlank(message = "Number of guests is required")
    private String guests;

    @NotNull(message = "Date is required")
    @FutureOrPresent(message = "Reservation date must be today or in the future")
    private LocalDate date;

    @NotNull(message = "Time is required")
    private LocalTime time;

    private String occasion;   // optional
    private String notes;      // optional

    // ---- Getters & Setters ----

    public String getName()    { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone()   { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail()   { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getGuests()  { return guests; }
    public void setGuests(String guests) { this.guests = guests; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getTime() { return time; }
    public void setTime(LocalTime time) { this.time = time; }

    public String getOccasion(){ return occasion; }
    public void setOccasion(String occasion) { this.occasion = occasion; }

    public String getNotes()   { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
