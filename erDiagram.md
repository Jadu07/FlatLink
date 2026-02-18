# FlatLink Database Schema

```mermaid
erDiagram
    %% Relationships
    User ||--o{ ConnectionRequest : "sends (1:N)"
    User ||--o{ ConnectionRequest : "receives (1:N)"
    User ||--o{ ChatRoom : "participates_in (1:N)"
    User ||--o{ Message : "sends (1:N)"
    ChatRoom ||--|{ Message : "contains (1:N)"

    %% User Entity
    User {
        UUID id PK
        string email
        string password_hash
        string full_name
        string college
        string company
        float budget_min
        float budget_max
        string bio
        geometry location "Point(Lat, Long)"
        timestamp created_at
    }

    %% Connection Request Entity
    ConnectionRequest {
        UUID id PK
        UUID sender_id FK
        UUID receiver_id FK
        enum status "PENDING, ACCEPTED, REJECTED"
        timestamp created_at
    }

    %% Chat Room Entity (Created after request accepted)
    ChatRoom {
        UUID id PK
        UUID user1_id FK
        UUID user2_id FK
        timestamp created_at
        boolean is_active
    }

    %% Message Entity
    Message {
        UUID id PK
        UUID chat_room_id FK
        UUID sender_id FK
        text content
        boolean is_read
        timestamp sent_at
    }
