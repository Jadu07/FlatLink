# FlatLink System Workflow

```mermaid
sequenceDiagram
    autonumber
    actor UserA as User A (Seeker)
    actor UserB as User B (Target)
    participant Client as Frontend Client
    participant API as Backend API
    participant DB as Database
    participant Notify as Notification Service

    Note over UserA, DB: Discovery Phase
    UserA->>Client: Search for flatmates
    Client->>API: GET /search
    API->>DB: Query matches
    DB-->>API: Return user list
    API-->>Client: 200 OK (User List)

    Note over UserA, Notify: Connection Request Phase
    UserA->>Client: Send Connection Request
    Client->>API: POST /request/send
    API->>DB: Create Request record
    DB-->>API: Success
    API->>Notify: Trigger alert
    Notify-->>UserB: Send "New Request" Email/Push
    API-->>Client: 201 Created (Request Pending)

    Note over UserB, DB: Acceptance Phase
    UserB->>Client: Accept Request
    Client->>API: POST /request/accept
    API->>DB: Update status to ACCEPTED
    API->>DB: Create Chat Session
    DB-->>API: Success
    API-->>Client: 200 OK (Chat Created)

    Note over UserA, UserB: Chat Phase
    Client-->>UserA: Unlock Chat Interface
    Client-->>UserB: Unlock Chat Interface
