# FlatLink

**Project Name:** FlatLink
**Goal:** Safe and structured flatmate discovery.

## Project Overview

FlatLink is a secure web platform designed to help students and young professionals find compatible flatmates based on location, college, budget, and the company they work at.

Unlike traditional platforms where users can directly message strangers, FlatLink prioritizes safety and privacy by implementing a **request-based communication model**. Users must first send a connection request, and chat functionality is unlocked only after the recipient accepts the request.

The platform focuses on structured filtering, location-based discovery, and permission-based communication to prevent spam and ensure mutual interest.

---

## Scope

### Inputs
* **User Profile:** College, budget, and bio.
* **Location:** City or specific coordinates.
* **Search Filters:** Radius, institution, price range.

### Outputs
* **Matched Profiles:** List of compatible users.
* **Connection Requests:** System for initiating contact.
* **Permission-based Chat:** Unlocked messaging interface.
* **Notifications:** Email alerts for activity.

---

## Key Features

### Profile Management
* **User Registration:** Secure login and account creation.
* **Detailed Profiles:** Includes college affiliation, budget range, and work details.
* **Bio:** Short personal description.

### Location-Based Search
* **Geospatial Filtering:** Users can filter potential flatmates by city or a specific radius.
* **Advanced Filters:**
    * Filter by College/University.
    * Filter by Budget Range.

### Request-Based Chat System
* **Permission First:** Users cannot send direct messages to strangers.
* **Connection Logic:** A "Connect Request" must be sent first.
* **Duplicate Prevention:** Logic to ensure requests are not sent multiple times to the same user.

### Real-Time Messaging
* **One-to-One Chat:** Enabled only after a request is accepted.
* **Message History:** Persistent chat logs.
* **Read Receipts:** Status indicators for messages.

### Notifications
* **Email Alerts:** Notifications for new requests and accepted connections.
* **Offline Alerts:** Notifications for messages received while offline.

---

## Why This Project?

FlatLink demonstrates a practical approach to modern full-stack development by solving a real world problem—safe housing discovery.

* **Secure Workflow:** Implements a permission-based interaction model rather than open access.
* **Geo-Location:** Handles complex spatial filtering.
* **Clean Architecture:** Demonstrates the use of industry standard design patterns and layered separation.
